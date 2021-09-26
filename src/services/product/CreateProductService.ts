import { IProduct } from "../../repositories/product/IProduct";

import { productSchema } from "../../validators/productValidator";
import { AppError } from "../../errors/AppError";

interface IRequest {
  name: string;
  price: Number;
  //   image: string;
  //   ingredients: string[];
}

class CreateProductService {
  constructor(private productRepository: IProduct) {}

  async execute({ name, price }: IRequest) {
    const data = {
      name,
      price,
    };

    try {
      await productSchema.validate(data);
    } catch (err) {
      throw new AppError(err.message, 400);
    }

    const product = await this.productRepository.create(data);

    return product;
  }
}

export { CreateProductService };
