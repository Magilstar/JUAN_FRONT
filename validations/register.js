import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup.string().required("Confirm Password is required").min(6),
});

export default registerSchema;
