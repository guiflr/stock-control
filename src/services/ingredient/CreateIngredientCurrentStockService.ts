import { IIngredientCurrentStock } from "../../repositories/ingredient/IIngredientCurrentStockRepository";

import { AppError } from "../../errors/AppError";

interface ICreate {
  ingredient_id: string;
  quantity: string;
}

class CreateIngredientCurrentStockService {
  constructor(private ingredientCurrentStock: IIngredientCurrentStock) {}

  async execute({ quantity, ingredient_id }: ICreate): Promise<ICreate> {
    if (!ingredient_id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Ingredient stock not found", 404);
    }

    if (!Number(quantity)) {
      throw new AppError("Quantity invalid type or not sent", 404);
    }

    const currentStock = await this.ingredientCurrentStock.create({
      quantity: quantity.toString(),
      ingredient_id,
    });

    return currentStock;
  }
}

export { CreateIngredientCurrentStockService };
