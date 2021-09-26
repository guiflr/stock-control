import * as Yup from "yup";

const ingredientInOutSchema = Yup.object().shape({
  type: Yup.string()
    .required("Type is required")
    .equals(["in", "out"], "Only 'in' and 'out' it's a valid value"),
  quantity: Yup.number()
    .positive("Invalid field quantity")
    .min(1, "Value zero is invalid")
    .required("Quantity is required")
    .typeError("Quantity is invalid type"),
});

export { ingredientInOutSchema };
