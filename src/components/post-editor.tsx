'use client';

import { useState } from 'react';
import { refineBlogPostWithAI } from '@/ai/flows/refine-blog-post-with-ai';
import { voiceToTextArticleCreation } from '@/ai/flows/voice-to-text-article-creation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VoiceRecorder } from './voice-recorder';
import { Loader2, Sparkles } from 'lucide-react';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const { toast } = useToast();

  const handleRefine = async () => {
    if (!content) {
      toast({
        title: 'Content is empty',
        description: 'Please write some content before refining.',
        variant: 'destructive'
      });
      return;
    }
    setIsRefining(true);
    try {
      const result = await refineBlogPostWithAI({ blogPostContent: content });
      setContent(result.refinedBlogPostContent);
      toast({
        title: 'Content Refined',
        description: 'Your blog post has been successfully refined by AI.',
      });
    } catch (error) {
      console.error('Error refining post:', error);
      toast({
        title: 'Error',
        description: 'Failed to refine the blog post.',
        variant: 'destructive',
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleTranscription = async (audioDataUri: string) => {
    setIsTranscribing(true);
    try {
      const result = await voiceToTextArticleCreation({ audioDataUri });
      setContent((prevContent) => prevContent ? `${prevContent}\n\n${result.articleDraft}` : result.articleDraft);
      toast({
        title: 'Voice Transcribed',
        description: 'Your voice recording has been converted to text.',
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: 'Error',
        description: 'Failed to transcribe the audio.',
        variant: 'destructive',
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Your amazing blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <div className="flex items-start gap-4">
            <div className="flex-grow space-y-2">
              <Textarea
                id="content"
                placeholder="Start writing your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="min-h-[300px]"
              />
              <Button onClick={handleRefine} disabled={isRefining || !content}>
                {isRefining ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Refine with AI
              </Button>
            </div>
            <VoiceRecorder onTranscription={handleTranscription} isLoading={isTranscribing} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Post</Button>
      </CardFooter>
    </Card>
  );
}
