import { Router } from "express";

import authMiddleware from './middlewares/authMiddleware'

import { IngredientController } from "../controller/IngredientController";

const ingredientController = new IngredientController();

const ingredientRoutes = Router();

ingredientRoutes.post("/", authMiddleware, (request, response) => {
    return response.json('Foi')
});

export { ingredientRoutes };
