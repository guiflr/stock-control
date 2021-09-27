import { Ingredient } from "../../models/Ingredient";

interface ICreateDTO {
  ingredient_current_stock?: string[];
  name: string;
  measurement_unit: string;
  unit_price: string;
}
interface IUpdateDTO {
  id: string;
  name: string;
  measurement_unit: string;
  unit_price: string;
}

interface IDeleteDTO {
  id: string;
}

interface IIngredientRepository {
  create({
    name,
    measurement_unit,
    unit_price,
  }: ICreateDTO): Promise<Ingredient>;
  list(): Promise<Ingredient[]>;
  update({
    name,
    measurement_unit,
    unit_price,
    id,
  }: IUpdateDTO): Promise<Ingredient>;
  delete({ id }: IDeleteDTO): Promise<Ingredient>;
  findById(id: string): Promise<Ingredient>;
}

export { ICreateDTO, IIngredientRepository, IUpdateDTO, IDeleteDTO };
