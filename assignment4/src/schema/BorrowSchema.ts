import * as z from "zod/v4";

export const borrowSchema = z.object({
  book: z.string().min(5),
  quantity: z.number().min(0),
  dueDate: z.date(),
});

export type BorrowFormData = z.infer<typeof borrowSchema>;
