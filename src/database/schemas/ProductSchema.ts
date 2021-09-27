import { Product } from "../../models/Product";

import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", function (next) {
  const price = Number(this.price);

  this.price = price.toFixed(2);

  next();
});

ProductSchema.virtual("ingredients", {
  ref: "ProductComposition",
  localField: "_id",
  foreignField: "product_id",
});

ProductSchema.set("toObject", { virtuals: true });
ProductSchema.set("toJSON", { virtuals: true });

export default mongoose.model<Product>("Product", ProductSchema);
