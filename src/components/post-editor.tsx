
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { Loader2, Wand2, Image as ImageIcon, UploadCloud, Bold, Italic, Link as LinkIcon, Heading2, Heading3, RemoveFormatting } from 'lucide-react';
import { VoiceRecorder } from './voice-recorder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { createPost, updatePost } from '@/lib/data';
import { supabase } from '@/lib/supabaseClient';
import type { Post } from '@/types';
import { marked } from 'marked';

interface PostEditorProps {
  post?: Post;
}

export function PostEditor({ post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [mainImage, setMainImage] = useState<string | null>(post?.image || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const { toast } = useToast();
  const router = useRouter();
  const t = translations.postEditor;
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);
  
  const isEditMode = !!post;

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    } else {
      selectionRef.current = null;
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (selectionRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(selectionRef.current);
      }
    }
  }, []);

  const handleSelection = useCallback(() => {
    saveSelection();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        setToolbarPosition({
          top: rect.top - editorRect.top - 50,
          left: rect.left - editorRect.left + rect.width / 2,
        });
        setShowToolbar(true);
      }
    } else {
      setShowToolbar(false);
    }
  }, [saveSelection]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          const lineStart = text.lastIndexOf('\n', range.startOffset) + 1;
          const line = text.substring(lineStart, range.startOffset);

          const match = line.match(/^(#{1,6})$/);
          if (match) {
            e.preventDefault();
            const headingLevel = match[1].length;
            
            const newRange = document.createRange();
            newRange.setStart(node, lineStart);
            newRange.setEnd(node, range.startOffset);
            newRange.deleteContents();

            document.execCommand('formatBlock', false, `h${headingLevel}`);
          }
        }
      }
    }
    handleSelection();
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    if (pastedText) {
      try {
        const html = await marked.parse(pastedText);
        restoreSelection();
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, html);
        handleContentChange();
      } catch (error) {
        console.error('Error parsing pasted markdown:', error);
        document.execCommand('insertText', false, pastedText);
        handleContentChange();
      }
    }
  };


  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const handleMouseUp = () => setTimeout(handleSelection, 0);
    editor.addEventListener('mouseup', handleMouseUp);
    return () => {
      editor.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleSelection]);


  const handleSave = async () => {
    if (!title || !content || !mainImage) {
      toast({
        title: "Error",
        description: "Please enter a title, content, and featured image.",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    try {
      const postData = {
        title,
        content,
        image_url: mainImage,
        tags: [], // TODO: Add tag input in the future
      };
      
      if (isEditMode) {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData);
      }

      toast({
        title: `Post ${isEditMode ? 'updated' : 'saved'} successfully`,
      });
      router.push('/admin');
      router.refresh(); // To see the changes in the dashboard
      
    } catch (error) {
       console.error("Error saving post:", error);
       toast({
        title: "Error saving post",
        description: (error as Error).message,
        variant: 'destructive'
      });
    }
    setIsSaving(false);
  };

  const handleFormat = (command: string, value?: string) => {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleContentChange();
    setShowToolbar(false);
  };

  const handleLink = () => {
    restoreSelection();
    if (linkUrl) {
      handleFormat('createLink', linkUrl);
    }
    setLinkUrl('');
    setIsLinkEditorOpen(false);
    setShowToolbar(false);
  };

  const handleClearFormatting = () => {
    restoreSelection();
    if (selectionRef.current) {
      document.execCommand('removeFormat', false);
      document.execCommand('formatBlock', false, 'p');
    }
    setShowToolbar(false);
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
    setIsAiLoading(true);
    try {
      const textContent = editorRef.current?.innerText || '';
      const result = await refineBlogPostWithAI({ blogPostContent: textContent });
      const refinedHtml = result.refinedBlogPostContent.split('\\n').map(p => `<p>${p}</p>`).join('');
      setContent(refinedHtml);
    } catch (error) {
      console.error('Error refining content:', error);
      toast({
        title: t.error,
        description: t.refineError,
        variant: 'destructive',
      });
    }
    setIsAiLoading(false);
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsAiLoading(true);
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
    setIsAiLoading(false);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('post-images') // Make sure you have a public bucket named 'post-images'
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage.from('post-images').getPublicUrl(fileName);
    return publicUrl;
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const publicUrl = await uploadFile(file);
      if(publicUrl){
         callback(publicUrl);
      }
    }
  };

  const insertImageInContent = (url: string) => {
    if (editorRef.current) {
      const imgHtml = `<img src="${url}" alt="Inserted image" style="max-width: 100%; height: auto; border-radius: 0.5rem;" />`;
      editorRef.current.focus();
      restoreSelection();
      document.execCommand('insertHTML', false, imgHtml);
      handleContentChange();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">{isEditMode ? 'Edit Post' : 'New Post'}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>This image will be displayed at the top of your post and in the post list.</CardDescription>
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
                  <Image src={mainImage} alt="Featured image preview" fill className="object-cover" />
                  <div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => mainImageInputRef.current?.click()}
                  >
                    <Button variant="secondary">Change Image</Button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-video cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => mainImageInputRef.current?.click()}
                >
                  <UploadCloud className="w-12 h-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload</p>
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
          <div className="relative">
            {showToolbar && (
              <div
                className="absolute z-10 bg-background border rounded-md shadow-md p-1 flex items-center gap-1"
                style={{
                  top: `${toolbarPosition.top}px`,
                  left: `${toolbarPosition.left}px`,
                  transform: 'translateX(-50%)',
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('bold')}>
                  <Bold className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('italic')}>
                  <Italic className="w-4 h-4" />
                </Button>
                <Popover open={isLinkEditorOpen} onOpenChange={setIsLinkEditorOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => saveSelection()}>
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="h-8"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleLink();
                          }
                        }}
                      />
                      <Button size="sm" onClick={handleLink}>Apply</Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="border-l mx-1 h-6"></div>
                <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('formatBlock', '<h2>')}>
                  <Heading2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('formatBlock', '<h3>')}>
                  <Heading3 className="w-4 h-4" />
                </Button>
                <div className="border-l mx-1 h-6"></div>
                <Button variant="ghost" size="icon" onMouseDown={handleClearFormatting}>
                  <RemoveFormatting className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              onBlur={handleContentChange}
              onMouseUp={handleSelection}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              className="prose dark:prose-invert prose-lg max-w-none min-h-[500px] border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-ring bg-transparent"
              dir="auto"
              suppressContentEditableWarning
            />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6 sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{t.aiTools}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleRefineWithAI} disabled={isAiLoading || isSaving} className="w-full">
                {isAiLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {t.refineWithAI}
                  </>
                )}
              </Button>
              <VoiceRecorder onTranscription={handleTranscription} isLoading={isAiLoading} />
              <Button onClick={handleSave} disabled={isSaving || isAiLoading} className="w-full">
                 {isSaving ? <Loader2 className="animate-spin" /> : (isEditMode ? 'Update Post' : t.savePost)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
