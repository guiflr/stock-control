import { IngredientInOut } from "../../models/IngredientInOut";
import {
  IIngredientInOutRepository,
  IIngredientInOutDTO,
} from "./IIngredientInOutRepository";

import IngredientInOutSchema from "../../database/schemas/IngredientInOutSchema";

class IngredientInOutRepository implements IIngredientInOutRepository {
  async create({
    ingredient_id,
    type,
    quantity,
  }: IIngredientInOutDTO): Promise<IngredientInOut> {
    const ingredient = await IngredientInOutSchema.create({
      ingredient_id,
      type,
      quantity,
    });

    return ingredient;
  }
}

export { IngredientInOutRepository };
