import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { StatusError } from "../exceptions/status-error";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../secrets";
import { getUserById } from "../data/user";

// Route: POST /api/auth/refresh
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req?.cookies?.token;

  if (!refreshToken)
    return next(new StatusError("Refresh token not found", 404));

  try {
    jwt.verify(
      String(refreshToken),
      JWT_REFRESH_SECRET,
      async (err, user: any) => {
        if (err) return next(new StatusError("Authentication failed", 403));

        const foundUser = await getUserById(user.userId);

        if (!foundUser) return next(new StatusError("Unauthorized", 401));

        const accessToken = jwt.sign(
          { userId: foundUser.id },
          JWT_ACCESS_SECRET,
          { expiresIn: "60s" }
        );

        return res.json({ accessToken });
      }
    );
  } catch (error: any) {
    if (error.issues) {
      return next(new StatusError("Unprocessable Entity", 422, error?.issues));
    }
    return next(new StatusError("Something went wrong!", 500, error));
  }
};
