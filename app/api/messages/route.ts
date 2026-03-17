import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createMessage } from "@/lib/messages";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await createMessage(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
