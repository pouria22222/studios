'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Image as ImageIcon, Video, Code, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { toast } = useToast();
  const t = translations.postEditor;

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const { startContainer } = sel.getRangeAt(0);
      setShowAddMenu(!startContainer.textContent || startContainer.textContent === '\n');
    }
  };
  
  const addElement = (el: 'image' | 'video' | 'code' | 'divider') =>
    toast({ title: t.wip, description: t.wipDesc(el) });

  return (
    <div className="space-y-6 post-editor">
      <Input
        id="title"
        placeholder={t.titlePlaceholder}
        className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        dir="auto"
      />

      <div className="relative group">
        <div
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
          className="focus:outline-none text-lg min-h-[400px] border rounded-md p-4"
          dir="ltr"
          style={{
            transform: 'scaleX(1) !important',
            direction: 'ltr !important',
            writingMode: 'horizontal-tb !important'
          }}
          suppressContentEditableWarning
        />
        <Popover open={showAddMenu} onOpenChange={setShowAddMenu}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'absolute top-0 -right-12 opacity-0 group-focus-within:opacity-100 transition-opacity p-1 rounded-full border bg-background hover:bg-muted',
                showAddMenu && 'opacity-100'
              )}
            >
              <Plus className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="left" className="w-auto p-1">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => addElement('image')}><ImageIcon className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => addElement('video')}><Video className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => addElement('code')}><Code className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => addElement('divider')}><List className="w-5 h-5" /></Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end">
        <Button>{t.savePost}</Button>
      </div>
    </div>
  );
}
