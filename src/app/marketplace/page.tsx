'use client';

import { useState, useEffect } from 'react';
import { getProducts, getPublicUrl } from '@/lib/data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { translations } from '@/lib/translations';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations.marketplace;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDownload = (product: Product) => {
    if (!product.download_url) return;
    const downloadUrl = getPublicUrl('downloadable', product.download_url);
    if (!downloadUrl) return;
    console.log(`Downloading ${product.name}...`);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = product.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-full flex flex-col">
              <CardContent className='p-4'>
                 <Skeleton className="h-6 w-3/4 mb-2" />
                 <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter className='p-4'>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          products.map((product) => {
            return (
              <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                <CardContent className='p-4 flex-grow'>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                </CardContent>
                <CardFooter className='p-4 flex-col items-stretch'>
                  <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-semibold">{product.price > 0 ? `$${product.price.toFixed(2)}` : 'Free'}</p>
                  </div>
                  <Button onClick={() => handleDownload(product)} disabled={!product.download_url}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
