import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUserDocument, User } from "../models/User.js";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, role, password, avatar } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // --- update fields ---
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    // --- update password if provided ---
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // -----------------------------
    // Avatar Handling Like Register
    // -----------------------------

    // 1) If file uploaded → multer gives: req.file.path (Cloudinary URL)
    if (req.file?.path) {
      user.avatar = req.file.path;
    }

    // 2) If client sends avatar URL manually
    if (avatar && !req.file) {
      user.avatar = avatar;
    }

    await user.save();

    // hide password
    const userObj = user.toObject() as Partial<IUserDocument>;
    delete userObj.password;

    return res.status(200).json({
      message: "User updated successfully",
      user: userObj,
    });

  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
