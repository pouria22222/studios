'use client';

import { useState } from 'react';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecorder } from './voice-recorder';
import { Loader2, Sparkles, Plus, Image as ImageIcon, Video, Code, List } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const [isRefining, setIsRefining] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { toast } = useToast();

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const { startContainer } = range;
        if (startContainer.textContent === '' || startContainer.textContent === '\n') {
           setShowAddMenu(true);
        } else {
           setShowAddMenu(false);
        }
    }
  };
  
  const handleRefine = async () => {
    const plainTextContent = content.replace(/<[^>]*>?/gm, '');
    if (!plainTextContent) {
      toast({
        title: 'محتوا خالی است',
        description: 'لطفا قبل از اصلاح مقداری محتوا بنویسید.',
        variant: 'destructive'
      });
      return;
    }
    setIsRefining(true);
    try {
      const result = await refineBlogPostWithAI({ blogPostContent: plainTextContent });
      // This will overwrite existing html with plain text. A more sophisticated
      // implementation would be to parse the HTML and refine the text nodes.
      setContent(`<p>${result.refinedBlogPostContent.replace(/\n/g, '</p><p>')}</p>`);
      toast({
        title: 'محتوا اصلاح شد',
        description: 'پست وبلاگ شما با موفقیت توسط هوش مصنوعی اصلاح شد.',
      });
    } catch (error) {
      console.error('خطا در اصلاح پست:', error);
      toast({
        title: 'خطا',
        description: 'اصلاح پست وبلاگ ناموفق بود.',
        variant: 'destructive',
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsTranscribing(true);
    try {
      const result = await voiceToTextArticleCreation({ audioDataUri });
      const currentContent = content === '<p><br></p>' ? '' : content;
      setContent(`${currentContent}<p>${result.articleDraft}</p>`);
      toast({
        title: 'صدا رونویسی شد',
        description: 'صدای ضبط شده شما به متن تبدیل شد.',
      });
    } catch (error) {
      console.error('خطا در رونویسی صدا:', error);
      toast({
        title: 'خطا',
        description: 'رونویسی صدا ناموفق بود.',
        variant: 'destructive',
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const addElement = (element: 'image' | 'video' | 'code' | 'divider') => {
    // Placeholder function for adding elements
    toast({
      title: 'قابلیت در دست ساخت',
      description: `افزودن ${element} هنوز پیاده‌سازی نشده است.`,
    });
  };

  return (
    <div className="flex gap-8">
      <div className="flex-grow">
        <Input
            id="title"
            placeholder="عنوان"
            className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto mb-4 placeholder:text-muted-foreground/50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        <div className="relative group">
           <div
            contentEditable
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose dark:prose-invert max-w-none focus:outline-none text-lg min-h-[400px]"
            />
          <Popover open={showAddMenu} onOpenChange={setShowAddMenu}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                    "absolute top-0 -left-12 opacity-0 group-focus-within:opacity-100 transition-opacity p-1 rounded-full border bg-background hover:bg-muted",
                     showAddMenu && "opacity-100"
                    )}
                >
                    <Plus className="w-5 h-5" />
                </button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-auto p-1">
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => addElement('image')}><ImageIcon className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => addElement('video')}><Video className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => addElement('code')}><Code className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => addElement('divider')}><List className="w-5 h-5" /></Button>
                </div>
            </PopoverContent>
           </Popover>
        </div>
      </div>

      <div className="w-80 flex-shrink-0">
        <Card>
          <CardHeader>
            <CardTitle>ابزارهای هوش مصنوعی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <Button onClick={handleRefine} disabled={isRefining || content === '<p><br></p>'} className="w-full">
                {isRefining ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                اصلاح با هوش مصنوعی
              </Button>
            <VoiceRecorder onTranscription={handleTranscription} isLoading={isTranscribing} />
          </CardContent>
          <CardFooter>
            <Button className="w-full">ذخیره پست</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
