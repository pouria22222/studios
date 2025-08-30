import { PostEditor } from '@/components/post-editor';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">پست جدید</h1>
      <PostEditor />
    </div>
  );
}
