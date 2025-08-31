import { getPosts } from '@/lib/data';
import { PostList } from '@/components/post-list';
import { translations } from '@/lib/translations';

export default async function Home() {
  const posts = await getPosts();
  const t = translations;

  return (
    <div className="space-y-8" dir="rtl">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">{t.home.title}</h1>
        <p className="text-muted-foreground text-lg">{t.home.subtitle}</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
