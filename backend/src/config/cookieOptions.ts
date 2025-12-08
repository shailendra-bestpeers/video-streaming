import type { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // set to true in production with HTTPS
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export default cookieOptions;
