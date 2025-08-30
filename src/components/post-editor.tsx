
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');


  const { toast } = useToast();
  const t = translations.postEditor;
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);


  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }, []);
  
  // Sync state with editor only when necessary
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
    saveSelection(); // Always save selection on mouse up
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        setToolbarPosition({
          top: rect.top - editorRect.top - 50, // Position toolbar above selection
          left: rect.left - editorRect.left + rect.width / 2, // Center toolbar
        });
        setShowToolbar(true);
      }
    } else {
      setShowToolbar(false);
    }
  }, [saveSelection]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleMouseUp = () => setTimeout(handleSelection, 0);
    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Backspace' || e.key === 'Delete') {
            setTimeout(handleSelection, 0);
        }
    };
    const handleFocus = () => saveSelection();

    editor.addEventListener('mouseup', handleMouseUp);
    editor.addEventListener('keyup', handleKeyUp);
    editor.addEventListener('focus', handleFocus);
    editor.addEventListener('mousedown', saveSelection); // Save selection on mousedown as well
    
    return () => {
      editor.removeEventListener('mouseup', handleMouseUp);
      editor.removeEventListener('keyup', handleKeyUp);
      editor.removeEventListener('focus', handleFocus);
      editor.removeEventListener('mousedown', saveSelection);
    };
  }, [handleSelection, saveSelection]);


  const handleSave = () => {
    console.log('Saving post:', { title, mainImage, content });
    toast({
      title: "پست ذخیره شد (شبیه‌سازی)",
      description: "در یک برنامه واقعی، این پست به پایگاه داده ارسال می‌شد.",
    });
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
        const selectedText = selectionRef.current.toString();
        // This is a simplified clear formatting. A more robust solution might involve more complex DOM manipulation.
        handleFormat('removeFormat');
        // Re-wrap in a p tag if it's now just plain text in the root
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
    setIsLoading(true);
    try {
      const textContent = editorRef.current?.innerText || '';
      const result = await refineBlogPostWithAI({ blogPostContent: textContent });
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
      editorRef.current.focus();
      restoreSelection();
      document.execCommand('insertHTML', false, imgHtml);
      handleContentChange();
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
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
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

            <div className="relative">
              {showToolbar && (
                <div
                  className="absolute z-10 bg-background border rounded-md shadow-md p-1 flex items-center gap-1"
                  style={{
                    top: `${toolbarPosition.top}px`,
                    left: `${toolbarPosition.left}px`,
                    transform: 'translateX(-50%)',
                  }}
                  onMouseDown={(e) => e.preventDefault()} // Prevent editor from losing focus
                >
                  <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('bold')}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onMouseDown={() => handleFormat('italic')}>
                    <Italic className="w-4 h-4" />
                  </Button>
                  
                  <Popover open={isLinkEditorOpen} onOpenChange={setIsLinkEditorOpen}>
                    <PopoverTrigger asChild>
                       <Button variant="ghost" size="icon" onClick={() => {
                        saveSelection();
                        const selection = window.getSelection();
                        const existingLink = selection?.focusNode?.parentElement?.closest('a');
                        setLinkUrl(existingLink?.href || '');
                       }}>
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
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        handleLink();
                                    }
                                }}
                            />
                            <Button size="sm" onClick={handleLink}>اعمال</Button>
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
                onKeyUp={handleSelection}
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
