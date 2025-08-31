
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Eye, PenSquare, Trash2, Loader2 } from 'lucide-react';
import { translations } from '@/lib/translations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Post } from '@/types';


export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = translations.admin;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleDelete = (postId: string) => {
    // In a real application, you would call an API to delete the post.
    // For this demo, we'll just log it and show an alert.
    console.log(`Deleting post ${postId}`);
    // You might want to show a toast notification here.
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-bold">{t.dashboard}</h1>
        <Button asChild>
          <Link href="/admin/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.newPost}
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>پست‌های وبلاگ</CardTitle>
          <CardDescription>پست‌های وبلاگ موجود خود را مدیریت کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>عنوان</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{new Date(post.date).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/posts/${post.id}`} title="مشاهده">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          {/* TODO: Create an edit page */}
                          <Link href={`/admin/new`} title="ویرایش">
                            <PenSquare className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="حذف">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent dir="rtl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                              <AlertDialogDescription>
                                این عمل غیرقابل بازگشت است. این پست برای همیشه حذف خواهد شد.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>انصراف</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDelete(post.id)}
                              >
                                بله، حذف کن
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
