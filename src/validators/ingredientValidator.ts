import * as Yup from "yup";

const ingredientSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  measurement_unit: Yup.string()
    .required("Measurement unit is required")
    .equals(["kg", "g", "lt"], "Only kg and g is valid"),
  unit_price: Yup.number()
    .positive("Invalid field unit_price")
    .min(1, "Value zero is invalid")
    .required("Unit price is required")
    .typeError("Unit price is invalid type"),
});

export { ingredientSchema };
