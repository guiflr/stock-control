import express from "express";

import { ingredientRoutes } from "@routes/ingredient.routes";

const app = express();

app.use(express.json());

app.use("/ingredient", ingredientRoutes);

app.listen(2323, () => {
  console.log("Server on Port 2323");
});

export { app };
