import { ProductComposition } from "../../models/ProductComposition";

import mongoose, { Schema } from "mongoose";

const ProductCompositionSchema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    ingredient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
    ingredient_quantity: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", function (next) {
  const ingredient_quantity = Number(this.ingredient_quantity);

  this.ingredient_quantity = ingredient_quantity.toFixed(3);

  next();
});

ProductCompositionSchema.virtual("ingredient", {
  ref: "Ingredient",
  localField: "ingredient_id",
  foreignField: "_id",
});

ProductCompositionSchema.virtual("ingredient_current_stock", {
  ref: "IngredientCurrentStock",
  localField: "ingredient_id",
  foreignField: "ingredient_id",
});

ProductCompositionSchema.set("toObject", { virtuals: true });

ProductCompositionSchema.set("toJSON", { virtuals: true });

export default mongoose.model<ProductComposition>(
  "ProductComposition",
  ProductCompositionSchema
);
