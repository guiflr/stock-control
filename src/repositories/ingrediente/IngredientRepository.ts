import { Ingredient } from "@models/Ingredient";
import { IIngredientRepository, ICreateDTO } from "./IIngredientRepository";

class IngredientRepository implements IIngredientRepository {
  ingredient: Ingredient[];

  constructor() {
    this.ingredient = [];
  }

  create({ name, measurement_unit, unit_price }: ICreateDTO): Ingredient {
    return null;
  }
  list() {
    return [];
  }
  update() {}
}

export { IngredientRepository };
