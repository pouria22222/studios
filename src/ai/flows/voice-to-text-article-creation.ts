'use server';
/**
 * @fileOverview Converts voice recordings to text for initial article drafts.
 *
 * - voiceToTextArticleCreation - A function that handles the voice to text conversion process.
 * - VoiceToTextArticleCreationInput - The input type for the voiceToTextArticleCreation function.
 * - VoiceToTextArticleCreationOutput - The return type for the voiceToTextArticleCreation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const VoiceToTextArticleCreationInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'A voice recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type VoiceToTextArticleCreationInput = z.infer<
  typeof VoiceToTextArticleCreationInputSchema
>;

const VoiceToTextArticleCreationOutputSchema = z.object({
  articleDraft: z.string().describe('The transcribed text from the audio recording.'),
});
export type VoiceToTextArticleCreationOutput = z.infer<
  typeof VoiceToTextArticleCreationOutputSchema
>;

export async function voiceToTextArticleCreation(
  input: VoiceToTextArticleCreationInput
): Promise<VoiceToTextArticleCreationOutput> {
  return voiceToTextArticleCreationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceToTextArticleCreationPrompt',
  input: {schema: VoiceToTextArticleCreationInputSchema},
  output: {schema: VoiceToTextArticleCreationOutputSchema},
  prompt: `Transcribe the following audio recording into text. This will be used as the initial draft for a blog post.\n\nAudio: {{audioDataUri}}`,
});

const voiceToTextArticleCreationFlow = ai.defineFlow(
  {
    name: 'voiceToTextArticleCreationFlow',
    inputSchema: VoiceToTextArticleCreationInputSchema,
    outputSchema: VoiceToTextArticleCreationOutputSchema,
  },
  async input => {
    // Gemini 2.5 will return audio in PCM format, but we need WAV
    const audioBuffer = Buffer.from(
      input.audioDataUri.substring(input.audioDataUri.indexOf(',') + 1),
      'base64'
    );

    const wavDataUri = 'data:audio/wav;base64,' + (await toWav(audioBuffer));

    const {output} = await prompt({audioDataUri: wavDataUri});
    return output!;
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
