import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

function getAuthBaseURL() {
  const envUrl = process.env.BETTER_AUTH_URL?.trim();
  if (envUrl) return normalizeOrigin(envUrl);
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return undefined;
}

function getTrustedOrigins() {
  const origins = new Set<string>();

  const envUrl = process.env.BETTER_AUTH_URL?.trim();
  if (envUrl) origins.add(normalizeOrigin(envUrl));

  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://localhost:3153");
  }

  return Array.from(origins);
}

export const auth = betterAuth({
  baseURL: getAuthBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: getTrustedOrigins(),
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
