import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import { IngredientInOutController } from "../controller/IngredientInOutController";

const ingredientController = new IngredientInOutController();

const ingredientInOutRoutes = Router();

ingredientInOutRoutes.post("/:id", authMiddleware, ingredientController.create);
// ingredientRoutes.put("/:id", authMiddleware, ingredientController.update);
// ingredientRoutes.delete("/:id", authMiddleware, ingredientController.delete);

//ingredientRoutes.get("/", ingredientController.listAll);

export { ingredientInOutRoutes };
