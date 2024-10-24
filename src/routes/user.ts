import { Router } from "express";
import { allUsers, currentUser } from "../controllers/userController";

const userRouter: Router = Router();

//get current user
userRouter.get("/currentUser", currentUser);

//get all user
userRouter.get("/allUsers", allUsers);

export default userRouter;
