'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-bold font-headline text-lg">{t.header.title}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.blog}
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.gallery}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.contact}
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center justify-end space-x-2 rtl:space-x-reverse">
           <Button asChild variant="outline">
              <Link href="/admin">{t.header.admin}</Link>
            </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        
        <div className="flex items-center md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'fa' ? 'right' : 'left'}>
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-bold font-headline text-lg">{t.header.title}</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  <Link href="/" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.blog}
                  </Link>
                  <Link href="/gallery" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.gallery}
                  </Link>
                  <Link href="/contact" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.contact}
                  </Link>
                  <Link href="/admin" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.admin}
                  </Link>
                </nav>
                <div className="flex items-center justify-start gap-4 pt-4 border-t">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
