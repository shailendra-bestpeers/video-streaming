import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./authMiddleware.js";

// roles can be: "admin" | "creator" | "viewer"
export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied. You do not have permission.",
        });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
