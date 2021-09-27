import { IProductComposition } from "../../repositories/productComposition/IProductCompositionRepository";

import {
  productCompositionSchema,
  productUpdateCompositionSchema,
} from "../../validators/productCompositionValidator";

import { AppError } from "../../errors/AppError";

interface IRequest {
  product_id: string;
  ingredient_id: string;
  ingredient_quantity: string;
}

class UpdateProductCompositionService {
  constructor(private productComposition: IProductComposition) {}
  async execute({
    product_id,
    ingredient_id,
    ingredient_quantity,
  }: IRequest): Promise<Boolean> {
    const data = {
      product_id,
      ingredient_id,
      ingredient_quantity,
    };

    try {
      await productUpdateCompositionSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const product = await this.productComposition.update(data);

    return product;
  }
}

export { UpdateProductCompositionService };
