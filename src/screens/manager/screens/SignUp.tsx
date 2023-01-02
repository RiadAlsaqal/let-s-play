import { ErrorMessage } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import {
  withFormikForm,
  TFormikProps,
  FormElementFactory,
} from "./../../../../src/shared/form";
const schema = Yup.object().shape({
  firstName: Yup.string()
    .required()
    .matches(/^([^0-9]*)$/, "first name must be string")
    .max(10),
  lastName: Yup.string()
    .required()
    .matches(/^([^0-9]*)$/, "last name must be string")
    .max(10),
});
export const SignUp: React.FC<TSingUpForm> = () => {
  const Form = withFormikForm<{}, {}>({
    children: (props) => {
      return (
        <View style={style.form}>
          <FormElementFactory<"TextField">
            elementProps={{
              placeholder: "first name",
            }}
            type="TextField"
            name="firstName"
            {...props}
          />
          <FormElementFactory<"TextField">
            elementProps={{
              placeholder: "last Name",
            }}
            type="TextField"
            name="lastName"
            {...props}
          />

          <FormElementFactory<"DatePicker">
            type="DatePicker"
            name="DatePicker"
            {...props}
          />
          <FormElementFactory<"SubmitButton">
            elementProps={{
              label: "click",
            }}
            type="SubmitButton"
            name="submitButton"
            {...props}
          />
        </View>
      );
    },
    handleSubmit: () => console.log("asd"),
    validationSchema: schema,
    mapPropsToValues: (props: any) => ({
      DatePicker: new Date(),
      firstName: "riad",
    }),
  });
  return <Form />;
};

const style = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

type TSingUpForm = TValues & Partial<TFormikProps<TValues>>;

type TValues = {
  myValues: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  };
};
