import { Request, Response } from "express";
import { NODE_ENV } from "../secrets";

// Route: POST /api/auth/logout
export const logout = (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (!cookie?.token) {
    return res.sendStatus(204); //No content
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: NODE_ENV === "production",
  });

  res.json({ message: "Logged out successfully" });
};
