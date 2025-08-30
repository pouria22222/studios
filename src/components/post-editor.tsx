'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { Loader2, Wand2 } from 'lucide-react';
import { VoiceRecorder } from './voice-recorder';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = translations.postEditor;

  const handleSave = () => {
    const htmlContent = content.split('\n').map(p => `<p>${p}</p>`).join('');
    console.log('Saving post:', { title, content: htmlContent });
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" dir="rtl">
      <div className="lg:col-span-2 space-y-6">
         <h1 className="text-3xl font-bold">پست جدید</h1>
        <Input
          placeholder={t.titlePlaceholder}
          className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          dir="auto"
        />
        <Textarea
          placeholder="داستان خود را اینجا بنویسید..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-w-none text-lg min-h-[500px] border rounded-md p-4 focus-visible:ring-1 bg-transparent"
          dir="auto"
        />
      </div>
      <div className="lg:col-span-1 space-y-6 sticky top-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t.aiTools}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
  );
}
