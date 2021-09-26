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
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ProductCompositionSchema.virtual("ingredient", {
  ref: "Ingredient",
  localField: "ingredient_id",
  foreignField: "_id",
});

ProductCompositionSchema.set("toObject", { virtuals: true });

ProductCompositionSchema.set("toJSON", { virtuals: true });

export default mongoose.model<ProductComposition>(
  "ProductComposition",
  ProductCompositionSchema
);
