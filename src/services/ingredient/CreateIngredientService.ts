import { Ingredient } from "@models/Ingredient";
import { IIngredientRepository } from "@repositories/ingrediente/IIngredientRepository";

interface IRequest {
  name: string;
  measurement_unit: string;
  unit_price: Number;
}

class CreateIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  execute({ name, measurement_unit, unit_price }: IRequest): Ingredient {
    const ingredient = this.ingredientRepository.create({
      name,
      measurement_unit,
      unit_price,
    });

    return ingredient;
  }
}

export { CreateIngredientService };
