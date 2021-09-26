import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import { IngredientController } from "../controller/IngredientController";

const ingredientController = new IngredientController();

const ingredientRoutes = Router();

ingredientRoutes.post("/", authMiddleware, ingredientController.create);
ingredientRoutes.put("/:id", authMiddleware, ingredientController.update);
ingredientRoutes.delete("/:id", authMiddleware, ingredientController.delete);

ingredientRoutes.get("/", ingredientController.listAll);

export { ingredientRoutes };
