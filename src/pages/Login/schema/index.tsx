import * as yup from "yup";

export const basicSchema = yup.object().shape({
  username: yup.string().min(5).required("Required"),
  password: yup.string().min(5).required("Required"),
});