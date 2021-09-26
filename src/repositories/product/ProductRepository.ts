import { Product } from "../../models/Product";
import { IProduct, IProductDTO, IProductUpdateDTO } from "./IProduct";

import ProductSchema from "../../database/schemas/ProductSchema";

class ProductRepository implements IProduct {
  async create({ name, price }: IProductDTO): Promise<Product> {
    const data = { name, price };

    const product = await ProductSchema.create(data);

    return product;
  }

  async list(): Promise<Product[]> {
    const products = await ProductSchema.find().populate({
      path: "ingredients",
      select: "product_id  ingredient_id ingredient_quantity -_id",
      populate: {
        path: "ingredient_id",
        select: "name measurement_unit unit_price",
      },
    });

    return products;
  }

  async update({ id, name, price }: IProductUpdateDTO): Promise<Product> {
    const product = await ProductSchema.findByIdAndUpdate(id, { name, price });

    return product;
  }

  async delete(id: string): Promise<Product> {
    const product = await ProductSchema.findByIdAndDelete(id);

    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await ProductSchema.findById(id);

    return product;
  }
}

export { ProductRepository };
