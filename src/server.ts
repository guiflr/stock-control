import "express-async-errors";
import "dotenv/config"

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { Database } from "./database/connection";

import { ingredientRoutes } from "../src/routes/ingredient.routes";
import { userRoutes } from "../src/routes/user.routes";

import { AppError } from "./errors/AppError";

const database = new Database();

database.connection();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/ingredients", ingredientRoutes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {   
    console.log(error)
    if (error instanceof AppError) {
      return response.status(error.status).json({ message: error.message });
    }

    return response.status(500).json({ message: "Internal Server Error" });
  }
);

app.listen(2323, () => {
  console.log("Server on Port 2323");
});

export { app };
