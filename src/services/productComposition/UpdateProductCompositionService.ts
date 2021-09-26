import { IProductComposition } from "../../repositories/productComposition/IProductCompositionRepository";

import { productCompositionSchema } from "../../validators/productCompositionValidator";

import { AppError } from "../../errors/AppError";

interface IngredientData {
  ingredient_id: string;
  ingredient_quantity: Number;
}

interface IRequest {
  product_id: string;
  ingredients: IngredientData[];
}

class CreateProductCompositionService {
  constructor(private productComposition: IProductComposition) {}
  async execute({ product_id, ingredients }: IRequest): Promise<Boolean> {
    const data = {
      product_id,
      ingredients,
    };

    try {
      await productCompositionSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const bulkData = ingredients.map((ingredient) => ({
      product_id,
      ...ingredient,
    }));

    console.log("$$$$$$$$", bulkData);

    const product = await this.productComposition.create(...bulkData);

    return true;
  }
}

export { CreateProductCompositionService };
