import mongoose from "mongoose";

import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";
import { ingredientSchema } from "../../validators/ingredientValidator";

import { AppError } from "../../errors/AppError";

interface IRequest {
  id: string;
  name: string;
  measurement_unit: string;
  unit_price: Number;
}

class UpdateIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute({
    name,
    measurement_unit,
    unit_price,
    id,
  }: IRequest): Promise<Ingredient> {
    const data = {
      name,
      measurement_unit,
      unit_price: unit_price.toFixed(2),
    };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Ingredient not found", 404);
    }

    try {
      await ingredientSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const ingredient = await this.ingredientRepository.update({ ...data, id });

    return ingredient;
  }
}

export { UpdateIngredientService };
