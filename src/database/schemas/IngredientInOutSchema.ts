import { IngredientInOut } from "../../models/IngredientInOut";

import IngredientSchema from "./IngredientSchema";
import mongoose, { Schema } from "mongoose";

const IngredientInOutSchema = new Schema(
  {
    type: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    ingredient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", function (next) {
  const quantity = Number(this.quantity);

  this.quantity = quantity.toFixed(3);

  next();
});

export default mongoose.model<IngredientInOut>(
  "IngredientInOut",
  IngredientInOutSchema
);
