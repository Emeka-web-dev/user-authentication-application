import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { StatusError } from "../exceptions/status-error";
import { JWT_ACCESS_SECRET } from "../secrets";

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const refreshToken = req?.cookies?.token;
  const authHeadrer = req.headers.authorization || req.headers.Authorization;
  if (!authHeadrer || !authHeadrer.startsWith("Bearer "))
    return res.status(401);

  const token = authHeadrer.split(" ")[1];

  if (!token || !refreshToken) {
    return next(new StatusError("Unauthorized", 401));
  }

  jwt.verify(String(token), JWT_ACCESS_SECRET, (err, decoded: any) => {
    if (err) return next(new StatusError("Authentication failed", 403));
    req.userId = decoded.userId;
    next();
  });
};
