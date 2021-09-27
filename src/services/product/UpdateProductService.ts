import { IProduct } from "../../repositories/product/IProduct";

import { productSchema } from "../../validators/productValidator";
import { AppError } from "../../errors/AppError";

interface IRequest {
  name: string;
  price: string;
  id: string;
}

interface IResponse {
  name: string;
  price: string;
}

class UpdateProductService {
  constructor(private productRepository: IProduct) {}

  async execute({ id, name, price }: IRequest): Promise<IResponse> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError("Product not found", 404);
    }

    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new AppError("Product nou found", 404);
    }

    const data = {
      id,
      name,
      price: price,
    };

    try {
      await productSchema.validate({ name, price });
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const product = await this.productRepository.update(data);

    return product;
  }
}

export { UpdateProductService };
