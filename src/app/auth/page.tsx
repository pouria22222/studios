
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { translations } from "@/lib/translations"

export default function AuthPage() {
  const t = translations.auth;

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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailLabel}</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.passwordLabel}</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">{t.login.button}</Button>
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
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name">{t.nameLabel}</Label>
                <Input id="name" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">{t.emailLabel}</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">{t.passwordLabel}</Label>
                <Input id="password-signup" type="password" required />
              </div>
              <Button type="submit" className="w-full">{t.signup.button}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
