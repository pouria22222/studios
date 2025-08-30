'use client';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <footer className="border-t" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          {t.footer.copyright(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
