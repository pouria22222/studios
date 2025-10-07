'use client';

import { useState, useEffect } from 'react';
import { getSettings } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Youtube, Send } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Skeleton } from '@/components/ui/skeleton';
import type { Settings } from '@/types';

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const t = translations.contact;

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchedSettings = await getSettings();
      setSettings(fetchedSettings);
    };
    fetchSettings();
  }, []);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">{t.cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!settings ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
               <div className="flex items-center gap-4 p-4">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </div>
          ) : (
            <>
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">{t.emailLabel}</p>
                    <p className="text-muted-foreground">{settings.email}</p>
                  </div>
                </a>
              )}
              {settings.youtube && (
                <a
                  href={`https://youtube.com/@${settings.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Youtube className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">Youtube</p>
                    <p className="text-muted-foreground">@{settings.youtube}</p>
                  </div>
                </a>
              )}
              {settings.telegram && (
                <a
                  href={`https://t.me/${settings.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <Send className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">Telegram</p>
                    <p className="text-muted-foreground">@{settings.telegram}</p>
                  </div>
                </a>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
