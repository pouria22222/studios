'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">{t.header.title}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.blog}
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.gallery}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <Button asChild variant="outline">
              <Link href="/admin">{t.header.admin}</Link>
            </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
