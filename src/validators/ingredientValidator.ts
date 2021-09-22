import * as Yup from "yup";

const ingredientSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  measurement_unit: Yup.string().required("Measurement unit is required"),
  unit_price: Yup.number()
    .required("Unit price is required")
    .typeError("Unit price is invalid type"),
});

export { ingredientSchema };
