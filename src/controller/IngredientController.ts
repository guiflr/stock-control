import { AppError } from "errors/AppError";
import { Request, Response } from "express";

import { IngredientRepository } from "../repositories/ingredient/IngredientRepository";
import { CreateIngredientService } from "../services/ingredient/CreateIngredientService";
import { UpdateIngredientService } from "../services/ingredient/UpdateIngredientService";
import { ListAllIngredientService } from "../services/ingredient/ListAllIngredientService";
import { DeleteIngredientService } from "../services/ingredient/DeleteIngredientService";

const ingredientRepository = new IngredientRepository();
class IngredientController {
  async create(request: Request, response: Response) {
    const createIngredientService = new CreateIngredientService(
      ingredientRepository
    );

    const { name, unitMeasurement, unitPrice } = request.body;

    const ingredient = await createIngredientService.execute({
      name,
      measurement_unit: unitMeasurement,
      unit_price: unitPrice,
    });

    return response.status(201).json(ingredient);
  }

  async update(request: Request, response: Response) {
    const updateIngredientService = new UpdateIngredientService(
      ingredientRepository
    );

    const { id } = request.params;

    const { name, unitMeasurement, unitPrice } = request.body;

    const ingredient = await updateIngredientService.execute({
      unit_price: unitPrice,
      name,
      measurement_unit: unitMeasurement,
      id,
    });

    return response.status(200).json(ingredient);
  }

  async listAll(request: Request, response: Response) {
    const listAllIngredientService = new ListAllIngredientService(
      ingredientRepository
    );

    const ingredients = await listAllIngredientService.execute();

    return response.status(200).json(ingredients);
  }

  async delete(request: Request, response: Response) {
    const deleteIngredientService = new DeleteIngredientService(
      ingredientRepository
    );

    const { id } = request.params;

    await deleteIngredientService.execute({ id });

    return response.status(200).send();
  }
}

export { IngredientController };
