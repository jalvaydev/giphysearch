import { z } from "zod";

export const giphyResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      alt_text: z.string(),
      images: z.object({
        fixed_height: z.object({
          width: z.string(),
          height: z.string(),
          webp: z.string(),
        }),
        original: z.object({
          width: z.string(),
          height: z.string(),
          webp: z.string(),
        }),
      }),
    }),
  ),
  pagination: z.object({
    count: z.number(),
    offset: z.number(),
    total_count: z.number(),
  }),
});

export type GiphyResponse = z.infer<typeof giphyResponseSchema>;
