import * as yup from "yup";

export const basicSchema = yup.object().shape({
  username: yup.string().min(5).required("Required"),
  password: yup.string().min(5).required("Required"),
  confirm_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
});