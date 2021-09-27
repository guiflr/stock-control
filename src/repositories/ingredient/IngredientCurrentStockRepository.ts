import {
  IIngredientCurrentStock,
  IIngredientCurrentStockDTO,
} from "./IIngredientCurrentStockRepository";

import IngredientCurrentStock from "../../database/schemas/IngredientCurrentStockSchema";

class IngredientCurrentStockRepository implements IIngredientCurrentStock {
  async create({
    quantity,
    ingredient_id,
  }: IIngredientCurrentStockDTO): Promise<IIngredientCurrentStockDTO> {
    const currentStock = await IngredientCurrentStock.create({
      quantity,
      ingredient_id,
    });

    return currentStock;
  }

  async findByIngredientId(
    ingredient_id: string
  ): Promise<IIngredientCurrentStockDTO> {
    const currentStock = await IngredientCurrentStock.findOne({
      ingredient_id,
    });

    return currentStock;
  }

  async updateByIngredientId({
    quantity,
    ingredient_id,
  }: IIngredientCurrentStockDTO): Promise<IIngredientCurrentStockDTO> {
    const currentStock = await IngredientCurrentStock.findOneAndUpdate(
      {
        ingredient_id,
      },
      { quantity }
    );

    return currentStock;
  }
}

export { IngredientCurrentStockRepository };
