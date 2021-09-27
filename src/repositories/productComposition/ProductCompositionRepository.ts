import {
  IProductCompositionDTO,
  IProductComposition,
} from "./IProductCompositionRepository";

import ProductCompositionSchema from "../../database/schemas/ProductCompositionSchema";

class ProductCompositionRepository implements IProductComposition {
  async create(
    ...args: IProductCompositionDTO[]
  ): Promise<IProductCompositionDTO[]> {
    const productComp = await ProductCompositionSchema.insertMany(args);
    return productComp;
  }

  async update({
    product_id,
    ingredient_id,
    ingredient_quantity,
  }: IProductCompositionDTO): Promise<Boolean> {
    const productComp = await ProductCompositionSchema.updateOne(
      { product_id, ingredient_id },
      { ingredient_quantity }
    );

    return !!productComp;
  }

  async delete(product_id: string, ingredient_id: string): Promise<Boolean> {
    const productComp = await ProductCompositionSchema.deleteOne({
      product_id,
      ingredient_id,
    });

    return !!productComp;
  }
}

export { ProductCompositionRepository };
