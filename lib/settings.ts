import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reminderRecipientEmailsInputSchema = z.object({
  recipientEmails: z.union([z.string(), z.array(z.string())]),
});

const emailSchema = z.string().trim().email().max(255);
const emailListSchema = z.array(emailSchema).max(50);

function normalizeRecipientEmails(input: string | string[]) {
  const raw =
    typeof input === "string" ? input.split(/[,\n;]+/g) : input.slice();
  const trimmed = raw.map((v) => String(v).trim()).filter(Boolean);
  return emailListSchema.parse(trimmed);
}

export async function getReminderRecipientEmails() {
  const appSetting = (prisma as any).appSetting as any;
  if (!appSetting) {
    throw new Error("Prisma Client is out of date");
  }

  const row = await appSetting.findUnique({
    where: { key: "reminderRecipientEmail" },
    select: { value: true },
  });
  const value = row?.value ?? "";
  if (!value.trim()) return [];
  return normalizeRecipientEmails(value);
}

export async function setReminderRecipientEmails(input: unknown) {
  const parsed = reminderRecipientEmailsInputSchema.parse(input);
  const recipientEmails = normalizeRecipientEmails(parsed.recipientEmails);
  const appSetting = (prisma as any).appSetting as any;
  if (!appSetting) {
    throw new Error("Prisma Client is out of date");
  }

  const value = recipientEmails.join(",");
  await appSetting.upsert({
    where: { key: "reminderRecipientEmail" },
    create: { key: "reminderRecipientEmail", value },
    update: { value },
  });
  return { recipientEmails };
}
