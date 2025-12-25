import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";
import { isAuthenticated } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/is-auth', userAuth, isAuthenticated);


export default userRouter;