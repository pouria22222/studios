'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { translations } from '@/lib/translations';
import { useToast } from '@/hooks/use-toast';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p><br></p>');
  const { toast } = useToast();
  const t = translations.postEditor;

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handleSave = () => {
    // In a real app, this would save the post to a database.
    console.log('Saving post:', { title, content });
    toast({
      title: "پست ذخیره شد (شبیه‌سازی)",
      description: "در یک برنامه واقعی، این پست به پایگاه داده ارسال می‌شد.",
    });
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder={t.titlePlaceholder}
        className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 h-auto placeholder:text-muted-foreground/50"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        dir="auto"
      />

      <div
        contentEditable
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose dark:prose-invert max-w-none focus:outline-none text-lg min-h-[400px] border rounded-md p-4"
        dir="auto"
        suppressContentEditableWarning
      />

      <div className="flex justify-end">
        <Button onClick={handleSave}>{t.savePost}</Button>
      </div>
    </div>
  );
}
