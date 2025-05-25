import { z } from "zod";

export const Schema = z.object({
  name: z
    .string()
    .min(3, { message: "*The Name must have atleast 3 Characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "*The Password must be atleast 6 Characters Long." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "*Phone must be a 10-digit number." }),
  gender: z
    .string()
    .min(2, { message: "*The Password must be atleast 2 Characters Long." }),
  dob: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "*Invalid date.",
  }),
});

export type FormData = z.infer<typeof Schema>;
