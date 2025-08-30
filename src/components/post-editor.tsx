'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { Loader2, Wand2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { VoiceRecorder } from './voice-recorder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import Image from 'next/image';
import { marked } from 'marked';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = translations.postEditor;
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    console.log('Saving post:', { title, mainImage, content });
    toast({
      title: "پست ذخیره شد (شبیه‌سازی)",
      description: "در یک برنامه واقعی، این پست به پایگاه داده ارسال می‌شد.",
    });
  };

  const handleRefineWithAI = async () => {
    if (!content) {
      toast({
        title: t.contentEmpty,
        description: t.contentEmptyDesc,
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await refineBlogPostWithAI({ blogPostContent: content });
      setContent(result.refinedBlogPostContent);
      toast({
        title: t.contentRefined,
        description: t.contentRefinedDesc,
      });
    } catch (error) {
      console.error('Error refining content:', error);
      toast({
        title: t.error,
        description: t.refineError,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsLoading(true);
    try {
      const result = await voiceToTextArticleCreation({ audioDataUri });
      setContent((prevContent) => prevContent ? `${prevContent}\n${result.articleDraft}` : result.articleDraft);
      toast({
        title: t.voiceTranscribed,
        description: t.voiceTranscribedDesc,
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: t.error,
        description: t.transcriptionError,
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          // In a real app, you'd upload this to a server and get a URL.
          // For now, we'll use the data URI as a placeholder.
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const insertImageInContent = (url: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const markdownImage = `\n![توضیحات تصویر](${url})\n`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + markdownImage + content.substring(end);
    
    setContent(newContent);
    
    // Move cursor after the inserted markdown
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
    }, 0);
  };
  
  const livePreviewHtml = { __html: marked.parse(content, { gfm: true, breaks: true }) };


  return (
    <div className="space-y-6" dir="rtl">
       <h1 className="text-3xl font-bold font-headline">پست جدید</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تصویر شاخص</CardTitle>
                <CardDescription>این تصویر در بالای پست شما و در لیست مقالات نمایش داده می‌شود.</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  ref={mainImageInputRef}
                  onChange={(e) => handleImageUpload(e, setMainImage)}
                  className="hidden"
                />
                {mainImage ? (
                  <div className="relative aspect-video rounded-md overflow-hidden group">
                    <Image src={mainImage} alt="پیش نمایش تصویر شاخص" fill className="object-cover" />
                    <div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => mainImageInputRef.current?.click()}
                    >
                      <Button variant="secondary">تغییر تصویر</Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-video cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => mainImageInputRef.current?.click()}
                  >
                    <UploadCloud className="w-12 h-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">برای آپلود کلیک کنید</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Input
              placeholder={t.titlePlaceholder}
              className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50 bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              dir="auto"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <h3 className="font-semibold">ویرایشگر (Markdown)</h3>
                 <Textarea
                    ref={textareaRef}
                    placeholder="داستان خود را اینجا بنویسید..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="max-w-none text-lg min-h-[500px] border rounded-md p-4 focus-visible:ring-1 bg-transparent font-mono"
                    dir="auto"
                  />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">پیش‌نمایش زنده</h3>
                <div 
                  className="prose dark:prose-invert prose-lg max-w-none min-h-[500px] border rounded-md p-4 bg-muted/20" 
                  dangerouslySetInnerHTML={livePreviewHtml}
                />
              </div>
            </div>

          </div>
          <div className="lg:col-span-1 space-y-6 sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t.aiTools}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <input
                    type="file"
                    accept="image/*"
                    ref={contentImageInputRef}
                    onChange={(e) => handleImageUpload(e, insertImageInContent)}
                    className="hidden"
                  />
                <Button onClick={() => contentImageInputRef.current?.click()} disabled={isLoading} className="w-full" variant="outline">
                  <ImageIcon className="ml-2 h-4 w-4" />
                  درج تصویر در متن
                </Button>
                <Button onClick={handleRefineWithAI} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Wand2 className="ml-2 h-4 w-4" />
                      {t.refineWithAI}
                    </>
                  )}
                </Button>
                
                <VoiceRecorder onTranscription={handleTranscription} isLoading={isLoading} />
                
                <Button onClick={handleSave} disabled={isLoading} className="w-full">
                  {t.savePost}
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
}
