'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  PlusCircle,
  GalleryHorizontal,
  Settings,
} from 'lucide-react';
import { translations } from '@/lib/translations';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const t = translations.admin;

  return (
    <div
      className="grid min-h-[calc(100vh-theme(spacing.14))] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      dir="rtl"
    >
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="font-headline">{t.title}</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                {t.dashboard}
              </Link>
              <Link
                href="/admin/new"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PlusCircle className="h-4 w-4" />
                {t.newPost}
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <GalleryHorizontal className="h-4 w-4" />
                {t.manageGallery}
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                {t.settings}
              </Link>
            </nav>
          </div>
        </div>
      </aside>
      <main className="flex flex-col p-4 lg:p-6">{children}</main>
    </div>
  );
}
