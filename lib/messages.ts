import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const createMessageInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;

export async function createMessage(input: CreateMessageInput) {
  const parsed = createMessageInputSchema.parse(input);
  const phone =
    parsed.phone && parsed.phone.trim().length > 0 ? parsed.phone.trim() : null;

  return prisma.message.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      phone,
      message: parsed.message,
    },
  });
}
