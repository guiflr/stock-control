import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";


class ListAllIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute(): Promise<Ingredient[]> {
    const ingredient = await this.ingredientRepository.list();

    return ingredient;
  }
}

export { ListAllIngredientService };
