import { User } from "../../models/User";

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
    admin: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
).pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

export default mongoose.model<User>("User", UserSchema);
