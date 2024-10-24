import { Response, Request, NextFunction } from "express";
import { getUserById } from "../data/user";
import { StatusError } from "../exceptions/status-error";
import { db } from "../lib/db";

// Route: GET /api/user/currentUser
export const currentUser = async (req: any, res: Response) => {
  const userId = req?.userId as number;

  const user = await getUserById(userId);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  return res.json(user);
};

// Route: GET /api/user/allUsers
export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await db.user.findMany();

    return res.json(users);
  } catch (error: any) {
    return next(new StatusError("Something went wrong!", 500, error));
  }
};
