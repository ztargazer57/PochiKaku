import { z } from "zod";

// LOGIN
export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

// REGISTER
export const registerSchema = z.object({
  username: z.string().min(3, "Username too short"),
  email: z.email("Invalid email"),
  password: z.string()
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[0-9]/, "Must include a number"),
});