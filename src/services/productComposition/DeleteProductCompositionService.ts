import { IProductComposition } from "../../repositories/productComposition/IProductCompositionRepository";

interface IRequest {
  product_id: string;
  ingredient_id: string;
}

class DeleteProductCompositionService {
  constructor(private productComposition: IProductComposition) {}
  async execute({ product_id, ingredient_id }: IRequest): Promise<Boolean> {
    const product = await this.productComposition.delete(
      product_id,
      ingredient_id
    );

    return product;
  }
}

export { DeleteProductCompositionService };
