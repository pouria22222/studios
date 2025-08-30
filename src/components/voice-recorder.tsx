'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2, MicOff } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscription: (audioDataUri: string) => void;
  isLoading: boolean;
}

export function VoiceRecorder({ onTranscription, isLoading }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' as PermissionName }).then((permissionStatus) => {
      setHasPermission(permissionStatus.state === 'granted');
      permissionStatus.onchange = () => {
        setHasPermission(permissionStatus.state === 'granted');
      };
    });
  }, []);


  const handleStartRecording = async () => {
    if (hasPermission === false) {
       try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
       } catch (error) {
         alert('دسترسی به میکروفون رد شد. لطفاً مجوزها را در تنظیمات مرورگر خود بررسی کنید.');
         return;
       }
    }

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
      console.error('خطا در دسترسی به میکروفون:', error);
       if (hasPermission) {
        alert('امکان دسترسی به میکروفون وجود ندارد. لطفاً بررسی کنید که توسط برنامه دیگری استفاده نمی‌شود.');
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const getButtonContent = () => {
      if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
      if (hasPermission === false) return <MicOff className="h-8 w-8" />;
      return <Mic className="h-8 w-8" />;
  }
  
  const getHelperText = () => {
    if (isLoading) return 'در حال رونویسی...';
    if (isRecording) return 'در حال ضبط...';
    if (hasPermission === false) return 'مجوز لازم است';
    return 'برای شروع ضربه بزنید';
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-muted/40">
      <p className="text-sm font-medium">صدا به متن</p>
      <p className="text-xs text-muted-foreground text-center">افکار خود را ضبط کنید و اجازه دهید هوش مصنوعی پست شما را پیش‌نویس کند.</p>
      {isRecording ? (
        <Button onClick={handleStopRecording} variant="destructive" size="icon" className="w-16 h-16 rounded-full">
          <Square className="h-8 w-8" />
        </Button>
      ) : (
        <Button onClick={handleStartRecording} disabled={isLoading || hasPermission === null} size="icon" className="w-16 h-16 rounded-full">
         {getButtonContent()}
        </Button>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        {getHelperText()}
      </p>
    </div>
  );
}
