import * as Yup from "yup";

const productCompositionSchema = Yup.object().shape({
  product_id: Yup.string().required("Product id field is required").matches(/^[0-9a-fA-F]{24}$/, "Ingredient ID field is invalid"),
  ingredients: Yup.array()
    .required("Ingredients field is required")
    .of(
      Yup.object().shape({
        ingredient_id: Yup.string()
          .required("Ingredient ID field is required")
          .matches(/^[0-9a-fA-F]{24}$/, "Ingredient ID field is invalid"),
        ingredient_quantity: Yup.number()
          .required("Quantity field is required")
          .positive()
          .min(1, "Value zero is invalid"),
      })
    )
    .typeError("Ingredients field is a array")
    .required("Ingredients field is required"),
});

export { productCompositionSchema };
