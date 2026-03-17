"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AdminMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const reminderEmailEnabled = false;
  const [activeTab, setActiveTab] = useState("messages");
  const [isForbidden, setIsForbidden] = useState(false);

  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(false);

  const [reminderRecipientEmailsText, setReminderRecipientEmailsText] =
    useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const userLabel = useMemo(() => {
    if (!session?.user) return "";
    return session.user.email || session.user.name || "";
  }, [session?.user]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
  }, [isPending, router, session?.user]);

  async function loadMessages() {
    setMessagesError(false);
    setMessagesLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { method: "GET" });
      if (res.status === 401) {
        router.replace("/sign-in");
        return;
      }
      if (res.status === 403) {
        setIsForbidden(true);
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const json = (await res.json()) as { ok: true; messages: AdminMessage[] };
      setMessages(json.messages);
    } catch {
      setMessagesError(true);
    } finally {
      setMessagesLoading(false);
    }
  }

  async function loadReminderRecipientEmail() {
    setSettingsError(null);
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/admin/settings/notification-email", {
        method: "GET",
      });
      if (res.status === 401) {
        router.replace("/sign-in");
        return;
      }
      if (res.status === 403) {
        setIsForbidden(true);
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const json = (await res.json()) as {
        ok: true;
        recipientEmails: string[];
      };
      setReminderRecipientEmailsText((json.recipientEmails || []).join("\n"));
    } catch {
      setSettingsError("加载失败");
    } finally {
      setSettingsLoading(false);
    }
  }

  async function saveReminderRecipientEmail(e: React.FormEvent) {
    e.preventDefault();
    setSettingsError(null);
    setSettingsSaved(false);
    setSettingsSaving(true);
    try {
      const res = await fetch("/api/admin/settings/notification-email", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recipientEmails: reminderRecipientEmailsText }),
      });
      if (res.status === 401) {
        router.replace("/sign-in");
        return;
      }
      if (res.status === 403) {
        setIsForbidden(true);
        return;
      }
      if (res.status === 400) {
        setSettingsError("邮箱格式不正确");
        return;
      }
      if (!res.ok) throw new Error("Failed");
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    } catch {
      setSettingsError("保存失败");
    } finally {
      setSettingsSaving(false);
    }
  }

  useEffect(() => {
    if (!session?.user) return;
    if (activeTab === "messages") void loadMessages();
    if (activeTab === "settings" && reminderEmailEnabled)
      void loadReminderRecipientEmail();
  }, [activeTab, session?.user]);

  async function handleSignOut() {
    try {
      await signOut();
    } finally {
      router.replace("/");
    }
  }

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <p className="text-muted-foreground">加载中...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <p className="text-muted-foreground">跳转中...</p>
      </main>
    );
  }

  if (isForbidden) {
    return (
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">后台管理</h1>
              <p className="text-sm text-muted-foreground">{userLabel}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-border"
                onClick={() => router.push("/")}
              >
                返回网站
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-border"
                onClick={() => router.push("/change-password")}
              >
                修改密码
              </Button>
              <Button type="button" onClick={handleSignOut}>
                退出登录
              </Button>
            </div>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-lg font-semibold text-foreground">无权限</h2>
              <p className="text-sm text-muted-foreground">
                当前账号不是总管理员，无法访问后台功能。
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">后台管理</h1>
            <p className="text-sm text-muted-foreground">{userLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-border"
              onClick={() => router.push("/")}
            >
              返回网站
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-border"
              onClick={() => router.push("/change-password")}
            >
              修改密码
            </Button>
            <Button type="button" onClick={handleSignOut}>
              退出登录
            </Button>
          </div>
        </div>


        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="messages">留言</TabsTrigger>
            <TabsTrigger value="settings" disabled={!reminderEmailEnabled}>
              留言提醒接收邮箱
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="pt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    留言列表
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border"
                    onClick={loadMessages}
                    disabled={messagesLoading}
                  >
                    {messagesLoading ? "刷新中..." : "刷新"}
                  </Button>
                </div>

                {messagesError ? (
                  <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-4">
                    <p className="text-sm font-medium text-destructive">
                      加载失败
                    </p>
                  </div>
                ) : null}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>时间</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>邮箱</TableHead>
                      <TableHead>电话</TableHead>
                      <TableHead className="w-[44%]">内容</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-muted-foreground"
                        >
                          {messagesLoading ? "加载中..." : "暂无留言"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      messages.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="text-muted-foreground">
                            {new Date(m.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {m.name}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {m.email}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {m.phone || "-"}
                          </TableCell>
                          <TableCell className="whitespace-normal text-foreground">
                            {m.message}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="pt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    留言提醒接收邮箱
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    发送邮箱由环境变量配置
                  </p>
                </div>

                {!reminderEmailEnabled ? (
                  <div className="rounded-sm border border-border bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">
                      功能已暂时停用
                    </p>
                  </div>
                ) : null}

                {settingsError ? (
                  <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-4">
                    <p className="text-sm font-medium text-destructive">
                      {settingsError}
                    </p>
                  </div>
                ) : null}

                {settingsSaved ? (
                  <div className="rounded-sm border border-accent/40 bg-accent/10 p-4">
                    <p className="text-sm font-medium text-foreground">
                      已保存
                    </p>
                  </div>
                ) : null}

                <form
                  onSubmit={saveReminderRecipientEmail}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reminderRecipientEmails" className="text-foreground">
                      接收邮箱
                    </Label>
                    <textarea
                      id="reminderRecipientEmails"
                      value={reminderRecipientEmailsText}
                      onChange={(e) => setReminderRecipientEmailsText(e.target.value)}
                      disabled={!reminderEmailEnabled || settingsLoading}
                      className="bg-secondary border-border text-foreground min-h-24 w-full rounded-md border px-3 py-2 text-sm"
                      placeholder={"receiver1@example.com\nreceiver2@example.com"}
                    />
                    <p className="text-xs text-muted-foreground">
                      可用换行、逗号或分号分隔多个邮箱
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={!reminderEmailEnabled || settingsSaving || settingsLoading}
                  >
                    {settingsSaving ? "保存中..." : "保存"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
