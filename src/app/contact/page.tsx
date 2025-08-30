'use client';

import { getSettings } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Instagram } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

export default function ContactPage() {
  const settings = getSettings();
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <div className="space-y-8 max-w-2xl mx-auto" dir={language === 'fa' ? 'rtl' : 'ltr'}>
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
          {settings.instagram && (
            <a
              href={`https://instagram.com/${settings.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <Instagram className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">{t.instagramLabel}</p>
                <p className="text-muted-foreground">@{settings.instagram}</p>
              </div>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
