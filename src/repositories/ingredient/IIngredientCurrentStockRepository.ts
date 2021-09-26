interface IIngredientCurrentStockDTO {
  quantity: Number;
  ingredient_id: string;
}

interface IIngredientCurrentStock {
  findByIngredientId(
    ingredient_id: string
  ): Promise<IIngredientCurrentStockDTO>;

  create({
    ingredient_id,
    quantity,
  }: IIngredientCurrentStockDTO): Promise<IIngredientCurrentStockDTO>;

  updateByIngredientId({
    ingredient_id,
    quantity,
  }: IIngredientCurrentStockDTO): Promise<IIngredientCurrentStockDTO>;
}

export { IIngredientCurrentStockDTO, IIngredientCurrentStock };
