'use client';

import { getPostById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

type PostPageProps = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const post = getPostById(params.id);
  const { language } = useLanguage();

  if (!post) {
    notFound();
  }

  const title = post.title[language];
  const content = post.content[language];

  // TODO: Add metadata generation for different languages
  /*
  export async function generateMetadata({ params }: PostPageProps) {
    const post = getPostById(params.id);
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }
    return {
      title: `${post.title} | Nazy's Nook`,
      description: post.content.substring(0, 160),
    };
  }
  */

  return (
    <article
      className="max-w-4xl mx-auto"
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      <header className="mb-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-8 shadow-lg">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            data-ai-hint={post.imageHint}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1024px"
          />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                language === 'fa' ? 'fa-IR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          </div>
        </div>
      </header>

      <div
        className="prose dark:prose-invert prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-headline prose-headings:text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <footer className="mt-12 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </footer>
    </article>
  );
}
