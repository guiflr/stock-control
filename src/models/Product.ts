import { Ingredient } from "../models/Ingredient";

interface IIngredients {
  ingredient: Ingredient[];
  ingredient_quantity: string;
  ingredient_current_stock: any[];
  name?: string;
}

class Product {
  name: string;
  price: string;
  image: string;
  ingredients: IIngredients[];
}

export { Product };
