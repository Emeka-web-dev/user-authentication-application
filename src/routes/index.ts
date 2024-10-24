import { Router } from "express";

import { verifyJWT } from "../middlewares/verify-jwt";
import authRouter from "./auth";
import userRouter from "./user";

const rootRouter: Router = Router();

// auth Router
rootRouter.use("/auth", authRouter);

// Protected route
rootRouter.use("/user", verifyJWT, userRouter);

export default rootRouter;
