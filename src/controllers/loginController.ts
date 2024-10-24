import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";

import { StatusError } from "../exceptions/status-error";
import { LoginSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, NODE_ENV } from "../secrets";

// Route: POST /api/auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedFields = LoginSchema.safeParse(req.body);

    if (!validatedFields.success) {
      return next(
        new StatusError("Unprocessable Entity", 422, validatedFields.error)
      );
    }
    const { email, password } = validatedFields.data;

    const currentUser = await getUserByEmail(email);

    if (!currentUser) {
      return next(new StatusError("Invalid user", 401));
    }

    if (!compareSync(password, currentUser.password)) {
      return next(new StatusError("Invalid Credential", 400));
    }

    const accessToken = jwt.sign(
      {
        userId: currentUser.id,
      },
      JWT_ACCESS_SECRET,
      { expiresIn: "60s" }
    );

    const newRefreshToken = jwt.sign(
      {
        userId: currentUser.id,
      },
      JWT_REFRESH_SECRET,
      { expiresIn: "2h" }
    );

    if (req.cookies) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: NODE_ENV === "production",
      });
    }

    res.cookie("token", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: NODE_ENV === "production",
      maxAge: 60 * 60 * 2000, // 2 hour
    });

    const { email: userEmail, id, password: userPassword } = currentUser;
    return res.json({
      userEmail,
      id,
      userPassword,
      accessToken,
    });
  } catch (error: any) {
    if (error.issues) {
      return next(new StatusError("Unprocessable Entity", 422, error?.issues));
    }
    return next(new StatusError("Something went wrong!", 500, error));
  }
};
