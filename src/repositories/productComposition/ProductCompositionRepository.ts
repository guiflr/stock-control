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

  async update(
    ...args: IProductCompositionDTO[]
  ): Promise<Boolean> {
    const productComp = await ProductCompositionSchema.updateMany({}, args, {
      upsert: true,
    });

    console.log(productComp);

    return !!productComp;
  }
}

export { ProductCompositionRepository };
