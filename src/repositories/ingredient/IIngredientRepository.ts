import { Ingredient } from "@models/Ingredient";

interface ICreateDTO {
  name: string;
  measurement_unit: string;
  unit_price: Number;
}

interface IIngredientRepository {
  create({ name, measurement_unit, unit_price }: ICreateDTO): Ingredient;
  list(): Ingredient[] | [];
  update({ name, measurement_unit, unit_price }: ICreateDTO): void;
}

export { ICreateDTO, IIngredientRepository };


