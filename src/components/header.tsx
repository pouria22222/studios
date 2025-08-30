import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">Nazy's Nook</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Blog
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Gallery
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <Button asChild variant="outline">
              <Link href="/admin">Admin Panel</Link>
            </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
