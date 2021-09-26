import { Ingredient } from "../../models/Ingredient";

import mongoose, { Schema } from "mongoose";

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    measurement_unit: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", function (next) {
  const unitPrice = Number(this.unit_price);

  this.unit_price = unitPrice.toFixed(2);

  next();
});

IngredientSchema.virtual("ingredient_stock_inputs", {
  ref: "IngredientInOut",
  localField: "_id",
  foreignField: "ingredient_id",
});

IngredientSchema.set("toObject", { virtuals: true });
IngredientSchema.set("toJSON", { virtuals: true });

export default mongoose.model<Ingredient>("Ingredient", IngredientSchema);
