import { PostEditor } from '@/components/post-editor';
import { getPostById } from '@/lib/data';
import { notFound } from 'next/navigation';

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return <PostEditor post={post} />;
}
