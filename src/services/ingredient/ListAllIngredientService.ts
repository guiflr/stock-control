import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";

class ListAllIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientRepository.list();

    const formattedIngredients = ingredients.map((ingredient) => {      
      if (ingredient.ingredient_current_stock.length === 0) {
        ingredient.ingredient_current_stock.push({ quantity: 0 });
      } else {
        ingredient.ingredient_current_stock[0].quantity = Number(
          ingredient.ingredient_current_stock[0].quantity
        );
      }

      //ingredient.ingredient_current_stock = ingredient_current_stock;
      delete ingredient.ingredient_current_stock;
      return ingredient;
    });

    return formattedIngredients;
  }
}

export { ListAllIngredientService };
