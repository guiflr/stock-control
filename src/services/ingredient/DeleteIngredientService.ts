import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";

import { AppError } from "../../errors/AppError";

interface IRequest {
  id: string;
}

class DeleteIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute({ id }: IRequest): Promise<Ingredient> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Ingredient not found", 404);
    }

    const ingredient = await this.ingredientRepository.delete({ id });

    return ingredient;
  }
}

export { DeleteIngredientService };
