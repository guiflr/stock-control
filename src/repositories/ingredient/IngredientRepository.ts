import { Ingredient } from "../../models/Ingredient";
import {
  IIngredientRepository,
  ICreateDTO,
  IUpdateDTO,
  IDeleteDTO,
} from "./IIngredientRepository";

import IngredientSchema from "../../database/schemas/IngredientSchema";
class IngredientRepository implements IIngredientRepository {
  async create({
    name,
    measurement_unit,
    unit_price,
  }: ICreateDTO): Promise<Ingredient> {
    const data = { name, measurement_unit, unit_price };

    const ingredient = await IngredientSchema.create(data);

    return ingredient;
  }

  async list(): Promise<Ingredient[]> {
    const ingredients = await IngredientSchema.find().select('name measurement_unit unit_price').populate("ingredient_stock_inputs", "type quantity -_id");

    return ingredients;
  }

  async update({
    id,
    measurement_unit,
    name,
    unit_price,
  }: IUpdateDTO): Promise<Ingredient> {
    const data = {
      measurement_unit,
      name,
      unit_price,
    };
    const ingredient = await IngredientSchema.findOneAndUpdate(
      { _id: id },
      data
    );

    return ingredient;
  }

  async delete({ id }: IDeleteDTO): Promise<Ingredient> {
    const ingredient = await IngredientSchema.findByIdAndDelete(id);

    return ingredient;
  }

  async findById(id: string): Promise<Ingredient> {
    const ingredient = await IngredientSchema.findById(id);

    return ingredient;
  }
}

export { IngredientRepository };
