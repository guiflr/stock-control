import { Router } from "express";

import { UserController } from "../controller/UserController";

const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/login", userController.find);
userRoutes.post("/create", userController.create);

export { userRoutes };