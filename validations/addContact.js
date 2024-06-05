import * as yup from "yup";

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Ajusta esta expresión regular según tus necesidades

const addContactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .array()
    .of(
      yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number is required")
    )
    .required("At least one phone number is required"),
  email: yup.string().email("Invalid email"),
});

export default addContactSchema;
