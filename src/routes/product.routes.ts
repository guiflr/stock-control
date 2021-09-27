import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import { ProductController } from "../controller/ProductController";
import { ProductCompositionController } from "../controller/ProductCompositionController";

const productController = new ProductController();
const productCompositionController = new ProductCompositionController();

const productRoutes = Router();

productRoutes.post("/", authMiddleware, productController.create);
productRoutes.put("/:id", authMiddleware, productController.update);
productRoutes.delete("/:id", authMiddleware, productController.delete);

productRoutes.post(
  "/:id/ingredients",
  authMiddleware,
  productCompositionController.create
);
productRoutes.put(
  "/:id/ingredients",
  authMiddleware,
  productCompositionController.update
);
productRoutes.delete(
  "/:id/ingredients",
  authMiddleware,
  productCompositionController.delete
);

productRoutes.get("/cost", authMiddleware, productController.cost);

productRoutes.get("/availability/:id", productController.availability);

productRoutes.get("/", productController.listAll);

export { productRoutes };
