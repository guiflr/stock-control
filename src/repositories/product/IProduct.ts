import { Product } from "../../models/Product";

interface IProductDTO {
  name: string;
  price: string;
}

interface IProductUpdateDTO {
  name: string;
  price: string;
  id: string;
}

interface IProduct {
  create({}: IProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  update({ name, price, id }: IProductUpdateDTO): Promise<Product>;
  delete(id: string): Promise<Product>;
}

export { IProduct, IProductDTO, IProductUpdateDTO };
