import { PostEditor } from '@/components/post-editor';
import { TestEditor } from '@/components/test-editor';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Simple Test Editor:</h2>
      <TestEditor />
      <hr />
      <h2 className="text-2xl font-bold mt-4">Main Post Editor:</h2>
      <PostEditor />
    </div>
  );
}
