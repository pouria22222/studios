
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { translations } from "@/lib/translations";
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const t = translations.auth;
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      toast({
        title: "خطا در ثبت نام",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
        if (data.user.identities && data.user.identities.length > 0) {
            toast({
                title: "ثبت نام موفق",
                description: "ایمیل خود را برای تایید حساب کاربری چک کنید.",
            });
        } else {
             toast({
                title: "خطا",
                description: "این کاربر قبلا ثبت نام کرده است. لطفا وارد شوید",
                variant: 'destructive'
            });
        }
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "خطا در ورود",
        description: error.message,
        variant: "destructive",
      });
    } else {
      router.push('/admin');
    }
    setIsLoading(false);
  };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]" dir="rtl">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t.login.tab}</TabsTrigger>
          <TabsTrigger value="signup">{t.signup.tab}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>{t.login.title}</CardTitle>
              <CardDescription>
                {t.login.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t.passwordLabel}</Label>
                  <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : t.login.button}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>{t.signup.title}</CardTitle>
              <CardDescription>
                {t.signup.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSignUp} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="name">{t.nameLabel}</Label>
                  <Input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">{t.emailLabel}</Label>
                  <Input id="email-signup" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">{t.passwordLabel}</Label>
                  <Input id="password-signup" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin" /> : t.signup.button}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
