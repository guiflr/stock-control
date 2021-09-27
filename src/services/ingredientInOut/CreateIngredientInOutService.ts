import { IngredientInOut } from "../../models/IngredientInOut";
import { IIngredientInOutRepository } from "../../repositories/ingredientInOut/IIngredientInOutRepository";

import { IngredientRepository } from "../../repositories/ingredient/IngredientRepository";
import { IngredientCurrentStockRepository } from "../../repositories/ingredient/IngredientCurrentStockRepository";

import { ingredientInOutSchema } from "../../validators/IngredientInOutValidator";

import { AppError } from "../../errors/AppError";

interface IRequest {
  id: string;
  quantity: string;
  type: string;
}

class CreateIngredientInOutService {
  constructor(private ingredientInOut: IIngredientInOutRepository) {}
  async execute({ quantity, id, type }: IRequest): Promise<IngredientInOut> {
    const ingredientRepository = new IngredientRepository();
    const ingredientCurrentStockRepository =
      new IngredientCurrentStockRepository();

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Ingredient not found", 404);
    }

    const ingredientsExists = await ingredientRepository.findById(id);

    if (!ingredientsExists) {
      throw new AppError("Ingredient not found", 404);
    }

    const receivQuantity = Number(quantity);

    if (!receivQuantity || receivQuantity < 0) {
      throw new AppError("Invalid field quantity", 400);
    }

    const currentStockTotal =
      await ingredientCurrentStockRepository.findByIngredientId(id);

    if (!currentStockTotal && type === "out") {
      throw new AppError("Ingredient insufficient stock", 400);
    }

    const currentStockQuantiry = Number(currentStockTotal?.quantity);

    if (currentStockQuantiry < receivQuantity && type === "out") {
      throw new AppError("Ingredient insufficient stock", 400);
    }

    if (!currentStockTotal) {
      await ingredientCurrentStockRepository.create({
        ingredient_id: id,
        quantity: receivQuantity.toString(),
      });
    } else {
      let newStockValue: Number;

      if (type === "out") {
        newStockValue =
          currentStockQuantiry.valueOf() - receivQuantity.valueOf();
      } else if (type === "in") {
        newStockValue =
          currentStockQuantiry.valueOf() + receivQuantity.valueOf();
      }

      await ingredientCurrentStockRepository.updateByIngredientId({
        ingredient_id: id,
        quantity: newStockValue.toString(),
      });
    }

    const data = {
      quantity: receivQuantity.toString(),
      type,
    };

    try {
      await ingredientInOutSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const ingredientStock = await this.ingredientInOut.create({
      ...data,
      ingredient_id: id,
    });

    return ingredientStock;
  }
}

export { CreateIngredientInOutService };
