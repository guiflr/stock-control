import { ProductRepository } from "../../repositories/product/ProductRepository";

import { AppError } from "../../errors/AppError";
class ProductCostService {
  constructor(private productRepository: ProductRepository) {}
  async execute() {
    const products = await this.productRepository.cost();

    const productsCost = products.map((product) => {
      const { name, price, ingredients } = product;

      const productCost = ingredients.reduce((acc, ingredientOfProduct) => {
        const { ingredient_quantity, ingredient } = ingredientOfProduct;

        const ingredientQuantityOfProduct = Number(ingredient_quantity);

        const unitPriceValue = Number(ingredient[0].unit_price);

        const productCost = ingredientQuantityOfProduct * unitPriceValue;

        acc = acc + productCost;

        return acc;
      }, 0);

      return {
        product: name,
        price: Number(price),
        cost: productCost,
      };
    });

    return productsCost;
  }
}

export { ProductCostService };
