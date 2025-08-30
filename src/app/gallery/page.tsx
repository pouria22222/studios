'use client';

import { useState, useMemo } from 'react';
import { getGalleryImages } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { GalleryImage } from '@/types';
import { useLanguage } from '@/context/language-provider';
import { translations } from '@/lib/translations';

export default function GalleryPage() {
  const images = getGalleryImages();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { language } = useLanguage();
  const t = translations[language].gallery;

  const categories = useMemo(() => {
    const allCategories = images.map((image) => image.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return images;
    }
    return images.filter((image) => image.category === selectedCategory);
  }, [images, selectedCategory]);

  const translatedCategories = useMemo(() => {
    return categories.map(category => ({
      key: category,
      name: t.categories[category.toLowerCase() as keyof typeof t.categories] || category
    }));
  }, [categories, t.categories]);


  return (
    <div className="space-y-8" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </header>

      <div className="flex justify-center flex-wrap gap-2">
        {translatedCategories.map(({key, name}) => (
          <Button
            key={key}
            variant={selectedCategory === key ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(key)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <CardContent className="p-0 relative" style={{ paddingBottom: '75%' }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.hint}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  {selectedImage.caption}
                </DialogTitle>
                <DialogDescription>{selectedImage.alt}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video mt-4">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain rounded-md"
                  data-ai-hint={selectedImage.hint}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
