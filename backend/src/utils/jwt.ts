// 🌟 Load env FIRST so JWT_SECRET is always available
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import type { IUserDocument } from "../models/User.js";

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is missing in .env");
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

// ---------------------- Types ---------------------- //

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

// ---------------------- Generate Token ---------------------- //

export const generateToken = (user: IUserDocument): string => {
  const obj = user.toObject();
  delete obj.password;

  const payload: JwtPayload = {
    id: obj._id.toString(),
    name: obj.name,
    email: obj.email,
    role: obj.role,
  };

  return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
};

// ---------------------- Verify Token ---------------------- //

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
};
