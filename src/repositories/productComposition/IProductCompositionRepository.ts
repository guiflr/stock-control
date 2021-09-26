interface IProductCompositionDTO {
  product_id: string;
  ingredient_id: string;
  ingredient_quantity: Number;
}

interface IProductComposition {
  create(...args : IProductCompositionDTO[]): Promise<IProductCompositionDTO[]>;
  update(...args : IProductCompositionDTO[]): Promise<Boolean>;
  //findProductById(product_id: string): Promise<IProductCompositionDTO>;
}

export { IProductCompositionDTO, IProductComposition };
