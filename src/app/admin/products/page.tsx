'use client';

import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadFile } from '@/lib/data';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [downloadableFile, setDownloadableFile] = useState<File | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await getProducts();
    setProducts(products);
    setIsLoading(false);
  };

  const handleSave = async () => {
    let downloadUrl = currentProduct.download_url;

    if (downloadableFile) {
        const downloadPath = await uploadFile('downloadable', downloadableFile);
        if(downloadPath) downloadUrl = downloadPath;
    }
    
    const productData: Omit<Partial<Product>, 'image_url'> = { ...currentProduct };
    delete (productData as Partial<Product>).image_url;

    productData.download_url = downloadUrl;
    productData.price = currentProduct.price === undefined ? 0 : currentProduct.price;

    if (isEditing !== null) {
      await updateProduct(isEditing, productData);
    } else {
      await createProduct(productData as Omit<Product, 'id' | 'created_at'>);
    }
    fetchProducts();
    setIsDialogOpen(false);
    setIsEditing(null);
    setCurrentProduct({});
    setDownloadableFile(null);
  };

  const handleDelete = async () => {
    if (productToDelete === null) return;
      const success = await deleteProduct(productToDelete);
      if (success) {
        fetchProducts();
      } else {
        alert('Failed to delete product. Check console for errors.');
      }
      setIsAlertOpen(false);
      setProductToDelete(null);
  };

  const openDialog = (product: Product | null = null) => {
    if (product) {
      setIsEditing(product.id);
      setCurrentProduct(product);
    } else {
      setIsEditing(null);
      setCurrentProduct({ price: 0 });
    }
    setIsDialogOpen(true);
  };

  const openAlertDialog = (id: number) => {
    setProductToDelete(id);
    setIsAlertOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Button onClick={() => openDialog()}> <PlusCircle className="mr-2" /> Add Product</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>{product.name}</CardTitle>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(product)}><Pencil className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => openAlertDialog(product.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="font-bold mt-4">{product.price > 0 ? `$${product.price}` : 'Free'}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Product Name"
              value={currentProduct.name || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={currentProduct.description || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={currentProduct.price ?? ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value === '' ? undefined : Number(e.target.value) })}
            />
            <div>
                <label className="text-sm font-medium">Downloadable File</label>
                <Input
                type="file"
                onChange={(e) => setDownloadableFile(e.target.files ? e.target.files[0] : null)}
                />
            </div>
          </div>
          <Button onClick={handleSave}>Save</Button>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
