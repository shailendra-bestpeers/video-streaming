import type { Request, Response } from "express";
import { User, IUserDocument } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import cookieOptions from "../config/cookieOptions.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "creator" | "viewer";
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user);

    return res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ token, user: sanitizeUser(user) });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    return res
      .cookie("token", token, cookieOptions)
      .json({ token, user: sanitizeUser(user) });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (
  req: Request & { user?: IUserDocument },
  res: Response
) => {
  if (!req.user)
    return res.status(401).json({ message: "Unauthorized" });

  return res.json({ user: sanitizeUser(req.user) });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  return res.json({ message: "Logged out successfully" });
};

const sanitizeUser = (user: IUserDocument) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});
