import { PostEditor } from '@/components/post-editor';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Create New Post</h1>
      <PostEditor />
    </div>
  );
}
