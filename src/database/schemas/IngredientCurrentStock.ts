import { IngredientCurrentStock } from "../../models/IngredientCurrentStock";

import mongoose, { Schema } from "mongoose";

const IngredientCurrentStockSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    ingredient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IngredientCurrentStock>(
  "IngredientCurrentStock",
  IngredientCurrentStockSchema
);
