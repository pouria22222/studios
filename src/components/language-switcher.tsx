'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-provider';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
      <Languages className="h-5 w-5" />
    </Button>
  );
}
