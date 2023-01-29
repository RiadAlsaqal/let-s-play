import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("email is requird"),
  password: Yup.string().required("password is requird"),
});
