import { IngredientInOut } from "../../models/IngredientInOut";

interface IIngredientInOutDTO {
  ingredient_id: string;
  quantity: string;
  type: string;
}

interface IIngredientInOutRepository {
  create({
    ingredient_id,
    quantity,
    type,
  }: IIngredientInOutDTO): Promise<IngredientInOut>;
}

export { IIngredientInOutDTO, IIngredientInOutRepository };
