'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { translations } from '@/lib/translations';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();
  const t = translations.postEditor;

  const handleSave = () => {
    // In a real app, this would save the post to a database.
    // For this demo, we'll convert newlines to <p> tags for display.
    const htmlContent = content.split('\n').map(p => `<p>${p}</p>`).join('');
    console.log('Saving post:', { title, content: htmlContent });
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

      <Textarea
        placeholder="داستان خود را اینجا بنویسید..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="max-w-none focus:outline-none text-lg min-h-[400px] border rounded-md p-4 focus-visible:ring-1"
        dir="auto"
      />

      <div className="flex justify-end">
        <Button onClick={handleSave}>{t.savePost}</Button>
      </div>
    </div>
  );
}
