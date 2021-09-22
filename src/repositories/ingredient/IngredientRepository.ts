import { v4 as uuidV4 } from 'uuid'

import { Ingredient } from "../../models/Ingredient";
import { IIngredientRepository, ICreateDTO } from "./IIngredientRepository";

class IngredientRepository implements IIngredientRepository {
  ingredients: Ingredient[];

  constructor() {
    this.ingredients = [];
  }

  create({ name, measurement_unit, unit_price }: ICreateDTO): Ingredient {
    const ingredient = new Ingredient();

    const data = { id: uuidV4(), name, measurement_unit, unit_price };

   Object.assign(ingredient, data);
    
   this.ingredients.push(ingredient);

    return ingredient;
  }
  list() {
    return [];
  }
  update() {}
}

export { IngredientRepository };
