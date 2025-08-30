'use client';

import { useState } from 'react';
import { getSettings } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';

export default function SettingsPage() {
  const initialSettings = getSettings();
  const [email, setEmail] = useState(initialSettings.email);
  const [instagram, setInstagram] = useState(initialSettings.instagram);
  const { toast } = useToast();
  const t = translations.settings;

  const handleSave = () => {
    // In a real application, you would save this to a database.
    // For this demo, we'll just show a toast notification.
    console.log('Saving settings:', { email, instagram });
    toast({
      title: t.saveSuccessTitle,
      description: t.saveSuccessDesc,
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl font-headline font-bold">{t.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t.cardTitle}</CardTitle>
          <CardDescription>{t.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">{t.instagramLabel}</Label>
            <Input
              id="instagram"
              type="text"
              placeholder="your_instagram_handle"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>{t.saveButton}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
