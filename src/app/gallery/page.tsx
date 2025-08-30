import { getGalleryImages } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Gallery</h1>
        <p className="text-muted-foreground text-lg">A collection of moments and inspirations.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group">
            <Card className="overflow-hidden h-full flex flex-col">
              <CardContent className="p-0 aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.hint}
                />
              </CardContent>
              <CardFooter className="p-4 bg-card">
                <p className="text-sm text-muted-foreground">{image.caption}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
