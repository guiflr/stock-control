import { Router } from "express";

import authMiddleware from './middlewares/authMiddleware'

import { UserController } from "../controller/UserController";

const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/create", userController.create);
userRoutes.post("/login", userController.find);

export { userRoutes };
