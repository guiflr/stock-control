import { json, Request, Response } from "express";

import { ProductCompositionRepository } from "../repositories/productComposition/ProductCompositionRepository";
import { CreateProductCompositionService } from "../services/productComposition/CreateProductCompositionService";

const productCompositionRepository = new ProductCompositionRepository();

class ProductCompositionController {
  async create(request: Request, response: Response) {
    const { id } = request.params;
    const { ingredients } = request.body;

    const createProductCompositionService = new CreateProductCompositionService(
      productCompositionRepository
    );

    const product = await createProductCompositionService.execute({
      product_id: id,
      ingredients,
    });

    response.status(201).send();
  }
}

export { ProductCompositionController };
