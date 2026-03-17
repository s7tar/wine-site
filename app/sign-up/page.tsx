"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = useMemo(() => "/admin", []);

  const signUpEnabled = false;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      const name = email.includes("@") ? email.split("@")[0] : email;

      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "注册失败");
        return;
      }

      router.push(callbackUrl);
    } catch {
      setError("注册失败");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md bg-card border-border">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">注册</h1>
            <p className="text-sm text-muted-foreground">
              已有账号？{" "}
              <Link href="/sign-in" className="text-accent hover:underline">
                去登录
              </Link>
            </p>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          {!signUpEnabled ? (
            <div className="rounded-sm border border-border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">注册已关闭</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                邮箱
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-secondary border-border text-foreground"
                placeholder="name@example.com"
                disabled={!signUpEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                密码
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="bg-secondary border-border text-foreground"
                placeholder="至少 8 位"
                disabled={!signUpEnabled}
              />
            </div>

            <Button
              type="submit"
              disabled={!signUpEnabled || isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isSubmitting ? "提交中..." : "创建账号"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
