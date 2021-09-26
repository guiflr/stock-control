import { Product } from "../../models/Product";

interface IProductDTO {
  name: string;
  price: Number;
}

interface IProductUpdateDTO {
  name: string;
  price: Number;
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
