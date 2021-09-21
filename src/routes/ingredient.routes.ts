import { Router } from "express";

import { IngredientRepository } from "@repositories/ingrediente/IngredientRepository";
import { CreateIngredientService } from "@services/ingredient/CreateIngredientService";

const ingredientRepository = new IngredientRepository();
const createIngredientService = new CreateIngredientService(
  ingredientRepository
);

const ingredientRoutes = Router();

ingredientRoutes.post("/", (request, response) => {
  const { name, unitMeasurement, unitPrice } = request.body;

  const ingredient = createIngredientService.execute({
    name,
    measurement_unit: unitMeasurement,
    unit_price: unitPrice,
  });

  return response.status(201).json(ingredient);
});

export {ingredientRoutes}