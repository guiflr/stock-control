import { Request, Response } from "express";

import { IngredientInOutRepository } from "../repositories/ingredientInOut/IngredientInOutRepository";

import { CreateIngredientInOutService } from "../services/ingredientInOut/CreateIngredientInOutService";

const ingredientInOutRepository = new IngredientInOutRepository();

class IngredientInOutController {
  async create(request: Request, response: Response) {
    const { id } = request.params;
    const { type, quantity } = request.body;

    const createIngredientInOutService = new CreateIngredientInOutService(
      ingredientInOutRepository
    );

    const ingredientInOut = await createIngredientInOutService.execute({
      id,
      type,
      quantity,
    });

    return response.status(201).json(ingredientInOut);
  }
}

export { IngredientInOutController };
