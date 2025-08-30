'use client';

import { useState } from 'react';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecorder } from './voice-recorder';
import { Loader2, Sparkles, Plus, Image as ImageIcon, Video, Code, List } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const [isRefining, setIsRefining] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].postEditor;

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const { startContainer } = sel.getRangeAt(0);
      setShowAddMenu(!startContainer.textContent || startContainer.textContent === '\n');
    }
  };

  const handleRefine = async () => {
    const plain = content.replace(/<[^>]*>?/gm, '');
    if (!plain) {
      toast({ title: t.contentEmpty, description: t.contentEmptyDesc, variant: 'destructive' });
      return;
    }
    setIsRefining(true);
    try {
      const result = await refineBlogPostWithAI({ blogPostContent: plain });
      setContent(`<p>${result.refinedBlogPostContent.replace(/\n/g, '</p><p>')}</p>`);
      toast({ title: t.contentRefined, description: t.contentRefinedDesc });
    } catch {
      toast({ title: t.error, description: t.refineError, variant: 'destructive' });
    } finally {
      setIsRefining(false);
    }
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsTranscribing(true);
    try {
      const result = await voiceToTextArticleCreation({ audioDataUri });
      const current = content === '<p><br></p>' ? '' : content;
      setContent(`${current}<p>${result.articleDraft}</p>`);
      toast({ title: t.voiceTranscribed, description: t.voiceTranscribedDesc });
    } catch {
      toast({ title: t.error, description: t.transcriptionError, variant: 'destructive' });
    } finally {
      setIsTranscribing(false);
    }
  };

  const addElement = (el: 'image' | 'video' | 'code' | 'divider') =>
    toast({ title: t.wip, description: t.wipDesc(el) });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-grow">
        <Input
          id="title"
          placeholder={t.titlePlaceholder}
          className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto mb-4 placeholder:text-muted-foreground/50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          dir="auto"
          style={{ unicodeBidi: 'plaintext' }}
        />

        <div className="post-editor relative group">
          <div
            contentEditable
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: content }}
            className={cn(
              'max-w-none focus:outline-none text-lg min-h-[400px] border rounded-md p-4',
              'prose dark:prose-invert',
              '[direction:unset]',
              '[unicode-bidi:plaintext]'
            )}
            dir="auto"
            suppressContentEditableWarning
          />
          <Popover open={showAddMenu} onOpenChange={setShowAddMenu}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'absolute top-0 -left-12 opacity-0 group-focus-within:opacity-100 transition-opacity p-1 rounded-full border bg-background hover:bg-muted',
                  showAddMenu && 'opacity-100',
                  language === 'fa' && 'right-auto -right-12 left-auto'
                )}
              >
                <Plus className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent side={language === 'fa' ? 'left' : 'right'} className="w-auto p-1">
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

      <div className="w-full md:w-80 flex-shrink-0">
        <Card>
          <CardHeader><CardTitle>{t.aiTools}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleRefine} disabled={isRefining || content === '<p><br></p>'} className="w-full">
              {isRefining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {t.refineWithAI}
            </Button>
            <VoiceRecorder onTranscription={handleTranscription} isLoading={isTranscribing} />
          </CardContent>
          <CardFooter><Button className="w-full">{t.savePost}</Button></CardFooter>
        </Card>
      </div>
    </div>
  );
}
