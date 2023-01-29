import React from "react";

import { withFormikForm, FormElementFactory } from "@src/shared/form";
import { StyleSheet, View } from "react-native";
import { loginValidationSchema } from "../utils";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../querys";
export const Login = () => {
  const [Mutat, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const LogInForm = withFormikForm<{}, TValue>({
    children: (props) => {
      return (
        <View>
          <FormElementFactory
            elementProps={{
              label: "email",
            }}
            name="email"
            type="TextField"
          />
          <FormElementFactory
            name="password"
            type="TextField"
            elementProps={{
              label: "password",
            }}
          />
          <FormElementFactory
            name="submitButton"
            type="SubmitButton"
            elementProps={{
              label: "login",
            }}
            containerProps={{
              style: { alignSelf: "center" },
            }}
          />
        </View>
      );
    },
    handleSubmit: ({ email, password }) =>
      Mutat({
        variables: {
          email,
          password,
        },
      }).then((e) => {
        console.log("eeeeeeeeee", e);
      }),
    validationSchema: loginValidationSchema,
  });

  return <LogInForm />;
};

const style = StyleSheet.create({
  form: {
    flex: 1,
  },
});

type TValue = {
  email: string;
  password: string;
};
