import { Request, Response } from "express";

import { ProductRepository } from "../repositories/product/ProductRepository";

import { CreateProductService } from "../services/product/CreateProductService";
import { ListAllProducts } from "../services/product/ListAllProducts";
import { UpdateProductService } from "../services/product/UpdateProductService";
import { DeleteProductService } from "../services/product/DeleteProductService";
import { AvailabilityProductService } from "../services/product/AvailabilityProductService";

const productRepository = new ProductRepository();

class ProductController {
  async create(request: Request, response: Response) {
    const createProductService = new CreateProductService(productRepository);

    const { name, price } = request.body;

    const product = await createProductService.execute({ name, price });

    return response.status(201).json(product);
  }

  async listAll(request: Request, response: Response) {
    const listAllProducts = new ListAllProducts(productRepository);

    const products = await listAllProducts.execute();

    return response.json(products);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, price } = request.body;
    const updateProductService = new UpdateProductService(productRepository);

    const data = { id, name, price };

    await updateProductService.execute(data);

    return response.send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteProductService = new DeleteProductService(productRepository);

    await deleteProductService.execute(id);

    return response.send();
  }

  async availability(request: Request, response: Response) {
    const { id } = request.params;
    const availabilityProductService = new AvailabilityProductService(
      productRepository
    );

    const products = await availabilityProductService.execute(id);

    return response.json(products);
  }
}

export { ProductController };
