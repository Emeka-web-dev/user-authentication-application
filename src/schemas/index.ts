import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email must not be empty!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email must not be empty!" }),
  password: z.string().min(1),
});
