import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { StatusError } from "../exceptions/status-error";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { db } from "../lib/db";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedFields = RegisterSchema.safeParse(req.body);

    if (!validatedFields.success) {
      return next(
        new StatusError("Unprocessable Entity", 422, validatedFields.error)
      );
    }

    const email = validatedFields.data?.email;
    const password = validatedFields.data?.password;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return next(new StatusError("User already exist!", 400));
    }

    await db.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error: any) {
    if (error.issues) {
      return next(new StatusError("Unprocessable Entity", 422, error?.issues));
    }
    return next(new StatusError("Something went wrong!", 500, error));
  }
};
