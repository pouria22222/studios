'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { translations } from '@/lib/translations';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const { toast } = useToast();
  const t = translations.postEditor;

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  return (
    <div className="space-y-6 post-editor" dir="auto">
      <Input
        id="title"
        placeholder={t.titlePlaceholder}
        className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        dir="auto"
      />

      <div className="relative">
        <div
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
          className="focus:outline-none text-lg min-h-[400px]"
          dir="auto"
          suppressContentEditableWarning
        />
      </div>

      <div className="flex justify-end">
        <Button>{t.savePost}</Button>
      </div>
    </div>
  );
}
