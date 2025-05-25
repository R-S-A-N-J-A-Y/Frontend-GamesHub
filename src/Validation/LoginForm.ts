import { z } from "zod";

export const Schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The Password must be atleast 6 Characters Long." }),
});

export type FormData = z.infer<typeof Schema>;
