import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: process.env.BETTER_AUTH_URL
    ? [process.env.BETTER_AUTH_URL]
    : [],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

function parseEmailList(value: string | undefined) {
  if (!value) return [];
  return value
    .split(/[,\n;\s]+/g)
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  const normalized = (email ?? "").trim().toLowerCase();
  if (!normalized) return false;

  const single = (process.env.SUPER_ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (single && normalized === single) return true;

  const list = parseEmailList(process.env.ADMIN_EMAILS);
  if (list.length === 0) return false;
  return list.includes(normalized);
}
