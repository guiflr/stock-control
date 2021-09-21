class Ingredient {
  id: string;
  name: string;
  measurement_unit: string;
  unit_price: Number;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { Ingredient };
