'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/post-card';
import type { Post } from '@/types';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();
  const t = translations[language].postList;

  const filteredPosts = useMemo(() => {
    if (!searchQuery) {
      return posts;
    }
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full max-w-sm mx-auto"
        />
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-16">{t.noArticles}</p>
      )}
    </div>
  );
}
