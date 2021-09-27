import { ProductRepository } from "../../repositories/product/ProductRepository";

class AvailabilityProductService {
  constructor(private productRepository: ProductRepository) {}
  async execute(id: string) {
    const product = await this.productRepository.availability(id);

    const { name, price, ingredients } = product;

    const availabilityIngredients = ingredients.map((ingredientOfProduct) => {
      const { ingredient_quantity, ingredient, ingredient_current_stock } =
        ingredientOfProduct;

      const ingredientQuantityOfProduct = Number(ingredient_quantity);

      let productIsAvailable = true;

      const currentStockIngredient =
        ingredient_current_stock.length > 0
          ? Number(ingredient_current_stock[0].quantity)
          : 0;

      if (ingredientQuantityOfProduct > currentStockIngredient) {
        productIsAvailable = false;
      }

      return { name: ingredient[0].name, available: productIsAvailable };
    });

    return {
      product: name,
      price: Number(price),
      available: !availabilityIngredients.some(
        (ingre) => ingre.available !== true
      ),
      ingredients: availabilityIngredients,
    };
  }
}

export { AvailabilityProductService };
