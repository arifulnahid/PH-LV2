import * as z from "zod/v4";

export const bookSchema = z.object({
  title: z.string().min(5),
  author: z.string().min(5),
  isbn: z.string().min(5),
  genre: z.string().min(5),
  copies: z.number().min(0),
  description: z.string(),
  available: z.boolean(),
});

export type BookFormData = z.infer<typeof bookSchema>;
