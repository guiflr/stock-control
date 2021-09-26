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
      type: Number,
      required: true,
    },
    ingredient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IngredientInOut>(
  "IngredientInOut",
  IngredientInOutSchema
);
