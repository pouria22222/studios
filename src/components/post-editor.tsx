'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { Loader2, Wand2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { VoiceRecorder } from './voice-recorder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import Image from 'next/image';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = translations.postEditor;
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync state with editor only when necessary
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);


  const handleSave = () => {
    console.log('Saving post:', { title, mainImage, content });
    toast({
      title: "پست ذخیره شد (شبیه‌سازی)",
      description: "در یک برنامه واقعی، این پست به پایگاه داده ارسال می‌شد.",
    });
  };

  const handleRefineWithAI = async () => {
    const currentContent = editorRef.current?.innerHTML || '';
    if (!currentContent) {
      toast({
        title: t.contentEmpty,
        description: t.contentEmptyDesc,
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      // We need to handle simple text extraction for the AI
      const textContent = editorRef.current?.innerText || '';
      const result = await refineBlogPostWithAI({ blogPostContent: textContent });
      // The AI returns plain text, so we wrap it in paragraphs
      const refinedHtml = result.refinedBlogPostContent.split('\n').map(p => `<p>${p}</p>`).join('');
      setContent(refinedHtml);
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
      const newParagraph = `<p>${result.articleDraft}</p>`;
      setContent((prevContent) => prevContent ? `${prevContent}${newParagraph}` : newParagraph);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          callback(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const insertImageInContent = (url: string) => {
    if (editorRef.current) {
      const imgHtml = `<img src="${url}" alt="تصویر درج شده" style="max-width: 100%; height: auto; border-radius: 0.5rem;" />`;
      // Restore focus and insert image at cursor position
      editorRef.current.focus();
      document.execCommand('insertHTML', false, imgHtml);
      setContent(editorRef.current.innerHTML);
    }
  };

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

            <div
              ref={editorRef}
              contentEditable
              onBlur={(e) => setContent(e.currentTarget.innerHTML)}
              className="max-w-none text-lg min-h-[500px] border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-ring bg-transparent"
              dir="auto"
              suppressContentEditableWarning
            />
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
