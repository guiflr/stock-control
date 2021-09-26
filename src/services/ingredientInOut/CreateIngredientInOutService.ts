import { IngredientInOut } from "../../models/IngredientInOut";
import { IIngredientInOutRepository } from "../../repositories/ingredientInOut/IIngredientInOutRepository";

import { IngredientRepository } from "../../repositories/ingredient/IngredientRepository";
import { IngredientCurrentStockRepository } from "../../repositories/ingredient/IngredientCurrentStockRepository";

import { ingredientInOutSchema } from "../../validators/IngredientInOutValidator";

import { AppError } from "../../errors/AppError";

interface IRequest {
  ingredient_id: string;
  quantity: Number;
  type: string;
}

class CreateIngredientInOutService {
  constructor(private ingredientInOut: IIngredientInOutRepository) {}
  async execute({
    quantity,
    ingredient_id,
    type,
  }: IRequest): Promise<IngredientInOut> {
    const ingredientRepository = new IngredientRepository();
    const ingredientCurrentStockRepository =
      new IngredientCurrentStockRepository();

    if (!ingredient_id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Ingredient not found", 404);
    }

    const ingredientsExists = await ingredientRepository.findById(
      ingredient_id
    );

    if (!ingredientsExists) {
      throw new AppError("Ingredient not found", 404);
    }

    if (!Number(quantity) || quantity < 0) {
      throw new AppError("Invalid field quantity", 400);
    }

    const currentStockTotal =
      await ingredientCurrentStockRepository.findByIngredientId(ingredient_id);

    if (!currentStockTotal && type === "out") {
      throw new AppError("Ingredient insufficient stock", 400);
    }

    if (currentStockTotal?.quantity < quantity && type === "out") {
      throw new AppError("Ingredient insufficient stock", 400);
    }

    if (!currentStockTotal) {
      await ingredientCurrentStockRepository.create({
        ingredient_id,
        quantity,
      });
    } else {
      let newStockValue: Number;

      if (type === "out") {
        newStockValue =
          currentStockTotal.quantity.valueOf() - quantity.valueOf();
      } else if (type === "in") {
        newStockValue =
          currentStockTotal.quantity.valueOf() + quantity.valueOf();
      }

      await ingredientCurrentStockRepository.updateByIngredientId({
        ingredient_id,
        quantity: newStockValue,
      });
    }

    const data = {
      quantity,
      type,
    };

    try {
      await ingredientInOutSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const ingredientStock = await this.ingredientInOut.create({
      ...data,
      ingredient_id,
    });

    return ingredientStock;
  }
}

export { CreateIngredientInOutService };
