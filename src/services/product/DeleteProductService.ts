import { IProduct } from "../../repositories/product/IProduct";

import { AppError } from "../../errors/AppError";

interface IResponse {
  name: string;
  price: Number;
}

class DeleteProductService {
  constructor(private productRepository: IProduct) {}

  async execute(id: string): Promise<IResponse> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Product not found", 404);
    }

    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new AppError("Product nou found", 404);
    }

    const product = await this.productRepository.delete(id);

    return product;
  }
}

export { DeleteProductService };
