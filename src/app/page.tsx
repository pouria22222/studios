import { getPosts } from '@/lib/data';
import { PostList } from '@/components/post-list';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">From My Nook</h1>
        <p className="text-muted-foreground text-lg">A collection of thoughts, stories, and ideas.</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
