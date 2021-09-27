import { json, Request, Response } from "express";

import { ProductCompositionRepository } from "../repositories/productComposition/ProductCompositionRepository";
import { CreateProductCompositionService } from "../services/productComposition/CreateProductCompositionService";
import { UpdateProductCompositionService } from "../services/productComposition/UpdateProductCompositionService";
import { DeleteProductCompositionService } from "../services/productComposition/DeleteProductCompositionService";

const productCompositionRepository = new ProductCompositionRepository();

class ProductCompositionController {
  async create(request: Request, response: Response) {
    const { id } = request.params;
    const { ingredients } = request.body;

    const createProductCompositionService = new CreateProductCompositionService(
      productCompositionRepository
    );

    await createProductCompositionService.execute({
      product_id: id,
      ingredients,
    });

    response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { ingredient } = request.body;

    const updateProductCompositionService = new UpdateProductCompositionService(
      productCompositionRepository
    );

    await updateProductCompositionService.execute({
      product_id: id,
      ...ingredient,
    });

    response.status(200).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { ingredient_id } = request.body;

    const deleteProductCompositionService = new DeleteProductCompositionService(
      productCompositionRepository
    );

    await deleteProductCompositionService.execute({
      product_id: id,
      ingredient_id,
    });

    response.status(200).send();
  }
}

export { ProductCompositionController };
