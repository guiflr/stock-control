import * as Yup from "yup";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .positive("Invalid field price")
    .min(1, "Value zero is invalid")
    .required("Price is required")
    .typeError("Price is invalid type"),
});

export { productSchema };
