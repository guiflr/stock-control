import { Router } from "express";

import { IngredientController } from "../controller/IngredientController";

const ingredientController = new IngredientController();

const ingredientRoutes = Router();

ingredientRoutes.post("/", ingredientController.create);

export { ingredientRoutes };
