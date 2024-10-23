import { Router } from "express";
import { signup } from "../controllers/registerController";
// import { login } from "../controllers/authController";
// import { refresh } from "../controllers/refreshController";
// import { logout } from "../controllers/logoutController";
// import { loginLimiter } from "../middlewares/login-limiter";

const authRouter: Router = Router();

authRouter.post("/signup", signup);
// authRouter.post("/login", [loginLimiter], login);
// authRouter.get("/refresh", refresh);
// authRouter.get("/logout", logout);

export default authRouter;
