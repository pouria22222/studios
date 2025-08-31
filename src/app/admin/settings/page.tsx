'use client';

import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import type { Settings } from '@/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { toast } = useToast();
  const t = translations.settings;

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      const initialSettings = await getSettings();
      setSettings(initialSettings);
      setIsLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      await updateSettings({ email: settings.email, instagram: settings.instagram });
      toast({
        title: t.saveSuccessTitle,
        description: t.saveSuccessDesc,
      });
    } catch (error) {
       toast({
        title: "خطا",
        description: "ذخیره تنظیمات ناموفق بود.",
        variant: 'destructive'
      });
    }
    setIsSaving(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setSettings(prev => prev ? {...prev, [id]: value} : null);
  }

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl font-headline font-bold">{t.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t.cardTitle}</CardTitle>
          <CardDescription>{t.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading || !settings ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={settings.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">{t.instagramLabel}</Label>
                <Input
                  id="instagram"
                  type="text"
                  placeholder="your_instagram_handle"
                  value={settings.instagram}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="animate-spin" /> : t.saveButton}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
