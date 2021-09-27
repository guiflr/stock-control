interface IProductCompositionDTO {
  product_id: string;
  ingredient_id: string;
  ingredient_quantity: string;
}

interface IProductComposition {
  create(...args: IProductCompositionDTO[]): Promise<IProductCompositionDTO[]>;
  update({
    product_id,
    ingredient_quantity,
    ingredient_id,
  }: IProductCompositionDTO): Promise<Boolean>;
  delete(product_id: string, ingredient_id: string): Promise<Boolean>;
}

export { IProductCompositionDTO, IProductComposition };
