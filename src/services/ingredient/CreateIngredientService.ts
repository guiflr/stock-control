import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";
import { ingredientSchema } from "../../validators/ingredientValidator";

import { AppError } from "../../errors/AppError";

interface IRequest {
  name: string;
  measurement_unit: string;
  unit_price: Number;
}

class CreateIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute({
    name,
    measurement_unit,
    unit_price,
  }: IRequest): Promise<Ingredient> {
    const data = {
      name,
      measurement_unit,
      unit_price,
    };

    try {
      await ingredientSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const ingredient = this.ingredientRepository.create(data);

    return ingredient;
  }
}

export { CreateIngredientService };
