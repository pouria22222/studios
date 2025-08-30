'use server';

/**
 * @fileOverview AI-powered blog post refinement flow.
 *
 * - refineBlogPostWithAI - A function that refines a blog post using AI to improve grammar, style, and overall quality.
 * - RefineBlogPostWithAIInput - The input type for the refineBlogPostWithAI function.
 * - RefineBlogPostWithAIOutput - The return type for the refineBlogPostWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineBlogPostWithAIInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post to be refined.'),
});
export type RefineBlogPostWithAIInput = z.infer<
  typeof RefineBlogPostWithAIInputSchema
>;

const RefineBlogPostWithAIOutputSchema = z.object({
  refinedBlogPostContent: z
    .string()
    .describe('The refined content of the blog post.'),
});
export type RefineBlogPostWithAIOutput = z.infer<
  typeof RefineBlogPostWithAIOutputSchema
>;

export async function refineBlogPostWithAI(
  input: RefineBlogPostWithAIInput
): Promise<RefineBlogPostWithAIOutput> {
  return refineBlogPostWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineBlogPostWithAIPrompt',
  input: {schema: RefineBlogPostWithAIInputSchema},
  output: {schema: RefineBlogPostWithAIOutputSchema},
  prompt: `You are an expert blog post editor. Refine the following blog post to improve its grammar, style, and overall quality. Ensure the refined blog post is professional and engaging.

Blog Post Content:
{{{blogPostContent}}}`,
});

const refineBlogPostWithAIFlow = ai.defineFlow(
  {
    name: 'refineBlogPostWithAIFlow',
    inputSchema: RefineBlogPostWithAIInputSchema,
    outputSchema: RefineBlogPostWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
