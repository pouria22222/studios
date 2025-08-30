'use client';
import { getPosts } from '@/lib/data';
import { PostList } from '@/components/post-list';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

export default function Home() {
  const posts = getPosts();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-8" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">{t.home.title}</h1>
        <p className="text-muted-foreground text-lg">{t.home.subtitle}</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
