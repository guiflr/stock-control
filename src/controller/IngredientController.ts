import { Request, Response } from "express";

import { IngredientRepository } from "../repositories/ingredient/IngredientRepository";
import { CreateIngredientService } from "../services/ingredient/CreateIngredientService";

class IngredientController {
  async create(request: Request, response: Response) {
    const ingredientRepository = new IngredientRepository();
    const createIngredientService = new CreateIngredientService(
      ingredientRepository
    );
    
    try {
      const { name, unitMeasurement, unitPrice } = request.body;

      const ingredient = await createIngredientService.execute({
        name,
        measurement_unit: unitMeasurement,
        unit_price: unitPrice,
      });

      return response.status(201).json(ingredient);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { IngredientController };
