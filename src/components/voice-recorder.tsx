'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2 } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscription: (audioDataUri: string) => void;
  isLoading: boolean;
}

export function VoiceRecorder({ onTranscription, isLoading }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          onTranscription(reader.result as string);
        };
        audioChunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check your browser permissions.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-muted/40">
      <p className="text-sm font-medium">Voice to Text</p>
      <p className="text-xs text-muted-foreground text-center">Record your thoughts and let AI draft your post.</p>
      {isRecording ? (
        <Button onClick={handleStopRecording} variant="destructive" size="icon" className="w-16 h-16 rounded-full">
          <Square className="h-8 w-8" />
        </Button>
      ) : (
        <Button onClick={handleStartRecording} disabled={isLoading} size="icon" className="w-16 h-16 rounded-full">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        {isLoading ? 'Transcribing...' : isRecording ? 'Recording...' : 'Tap to start'}
      </p>
    </div>
  );
}
