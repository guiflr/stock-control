import { IProduct } from "../../repositories/product/IProduct";

interface IResponse {
  name: string;
  price: Number;
}

class ListAllProducts {
  constructor(private productRepository: IProduct) {}

  async execute(): Promise<IResponse[]> {
    const products = await this.productRepository.list();

    return products;
  }
}

export { ListAllProducts };
