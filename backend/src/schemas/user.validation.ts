import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["creator", "viewer"]).optional(),
  avatar: z.string().url().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  role: z.enum(["admin", "creator", "viewer"]).optional(),
  avatar: z.string().url().optional(),
});
