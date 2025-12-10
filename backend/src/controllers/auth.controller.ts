import type { Request, Response } from "express";
import { User, IUserDocument } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import cookieOptions from "../config/cookieOptions.js";

// -------------------- REGISTER -------------------- //

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const avatarUrl = req.file?.path;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar: avatarUrl,
    });

    const token = generateToken(user);
       const userObj = user.toObject() as Partial<IUserDocument>;
          delete userObj.password;


    return res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user:userObj,   // password is NOT included because mongoose hides it
      });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGIN -------------------- //

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // Remove only because `.select("+password")` exposes it
    const userObj = user.toObject() as Partial<IUserDocument>;
    delete userObj.password;

    return res
      .cookie("token", token, cookieOptions)
      .json({
        message: "Login successful",
        token,
        user: userObj,
      });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------- PROFILE -------------------- //

export const getProfile = async (
  req: Request & { user?: IUserDocument },
  res: Response
) => {
  if (!req.user)
    return res.status(401).json({ message: "Unauthorized" });

  return res.json({ user: req.user });
};

// -------------------- LOGOUT -------------------- //

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  return res.status(200).json({ message: "Logged out successfully" });
};
