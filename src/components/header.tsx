
'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';
import { translations } from '@/lib/translations';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


export function Header() {
  const t = translations;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    
    // Check initial state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };
  
  const AuthButtons = () => {
    if (user) {
      return (
        <>
          <Button asChild variant="outline">
            <Link href="/admin">
              <LayoutDashboard className="mr-2" />
              {t.admin.dashboard}
            </Link>
          </Button>
          <Button onClick={handleLogout} variant="ghost" size="icon" title="Logout">
            <LogOut />
          </Button>
        </>
      );
    }
    return (
      <Button asChild variant="outline">
        <Link href="/auth">{t.header.admin}</Link>
      </Button>
    );
  };
  
  const MobileAuthLinks = () => {
     if (user) {
        return (
          <>
            <Link href="/admin" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
              {t.admin.dashboard}
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
              Logout
            </Link>
          </>
        );
      }
      return (
        <Link href="/auth" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
          {t.header.admin}
        </Link>
      );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">{t.header.title}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.blog}
            </Link>
            <Link href="/marketplace" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.marketplace}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t.header.contact}
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center justify-end space-x-2">
           <AuthButtons />
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
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-bold font-headline text-lg">{t.header.title}</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  <Link href="/" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.blog}
                  </Link>
                  <Link href="/marketplace" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.marketplace}
                  </Link>
                  <Link href="/contact" className="transition-colors hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    {t.header.contact}
                  </Link>
                  <MobileAuthLinks />
                </nav>
                <div className="flex items-center justify-start gap-4 pt-4 border-t">
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
