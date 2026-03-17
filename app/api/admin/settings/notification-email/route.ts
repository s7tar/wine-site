import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth, isAdminEmail } from "@/lib/auth";
import {
  getReminderRecipientEmails,
  setReminderRecipientEmails,
} from "@/lib/settings";

export const runtime = "nodejs";

const reminderEmailEnabled = false;

export async function GET(request: Request) {
  if (!reminderEmailEnabled) {
    return NextResponse.json({ ok: false, error: "Disabled" }, { status: 404 });
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  if (!isAdminEmail(session.user.email)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden" },
      { status: 403 },
    );
  }

  try {
    const recipientEmails = await getReminderRecipientEmails();
    return NextResponse.json({ ok: true, recipientEmails });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Prisma Client is out of date"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Prisma Client is out of date. Restart dev server after prisma generate.",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!reminderEmailEnabled) {
    return NextResponse.json({ ok: false, error: "Disabled" }, { status: 404 });
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
  if (!isAdminEmail(session.user.email)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const result = await setReminderRecipientEmails(body);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 },
      );
    }
    if (
      error instanceof Error &&
      error.message === "Prisma Client is out of date"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Prisma Client is out of date. Restart dev server after prisma generate.",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
