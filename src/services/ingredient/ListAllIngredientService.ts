import { IIngredientRepository } from "../../repositories/ingredient/IIngredientRepository";

interface IResponse {
  name: string;
  totalStock: Number;
  id: string;
}

class ListAllIngredientService {
  constructor(private ingredientRepository: IIngredientRepository) {}
  async execute(): Promise<IResponse[]> {
    const ingredients = await this.ingredientRepository.list();

    const formattedIngredients = ingredients.map((ingredient) => {
      if (ingredient.ingredient_current_stock.length === 0) {
        ingredient.ingredient_current_stock.push({ quantity: 0 });
      } else {
        ingredient.ingredient_current_stock[0].quantity = Number(
          ingredient.ingredient_current_stock[0].quantity
        );
      }

      const { name, ingredient_current_stock } = ingredient;

      return {
        name,
        totalStock: Number(ingredient_current_stock[0].quantity),
        id: ingredient._id,
      };
    });

    return formattedIngredients;
  }
}

export { ListAllIngredientService };
