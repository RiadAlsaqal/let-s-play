import * as Yup from "yup";
import moment from "moment";

export const SignupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("first name is required")
    .matches(/^([^0-9]*)$/, "first name must be string")
    .max(10),
  lastName: Yup.string()
    .required("last name is required")
    .matches(/^([^0-9]*)$/, "last name must be string")
    .max(10),
  DatePicker: Yup.date().max(
    moment().subtract(15, "years"),
    "you should be younger then 14 years old"
  ),
  email: Yup.string().email().required("email is required"),
  MapView: Yup.object()
    .shape({
      latitude: Yup.string(),
      longitude: Yup.number(),
      latitudeDelta: Yup.number(),
      longitudeDelta: Yup.number(),
    })
    .test({
      message: "location is required",
      test: ({ longitude }) => {
        console.log({ longitude });
        console.log(typeof longitude === "number", "ty[");
        return typeof longitude === "number";
      },
    }),
});
