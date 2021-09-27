import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
class Database {
  connection() {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Connected to mongodb");
    });
  }
}

export { Database };
