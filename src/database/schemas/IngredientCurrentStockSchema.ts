import { IngredientCurrentStock } from "../../models/IngredientCurrentStock";

import mongoose, { Schema } from "mongoose";

const IngredientCurrentStockSchema = new Schema(
  {
    quantity: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    ingredient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", function (next) {
  const quantity = Number(this.quantity);

  this.quantity = quantity.toFixed(3);

  next();
});

export default mongoose.model<IngredientCurrentStock>(
  "IngredientCurrentStock",
  IngredientCurrentStockSchema
);
