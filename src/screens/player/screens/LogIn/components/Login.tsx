import React from "react";

import { withFormikForm, FormElementFactory } from "@src/shared/form";
import { StyleSheet, View } from "react-native";
import { loginValidationSchema } from "../utils";
import { useMutation } from "@src/shared/hooks";
import { LOGIN_MUTATION } from "../querys";
import { useAuth } from "@src/shared/Auth";
export const Login = () => {
  const [Mutat, { data, loading, error }] =
    useMutation<TResponse>(LOGIN_MUTATION);
  const { saveToken, handleUser } = useAuth();
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
    handleSubmit: ({ email, password }) => {
      Mutat({
        variables: { email, password },
      })
        .then((e) => {
          const user = e.data?.login.user;
          saveToken?.({
            key: "token",
            value: e.data?.login?.token as string,
          });
          handleUser?.({
            user: {
              email: user?.email as string,
              firstName: user?.firstName as string,
              lastName: user?.lastName as string,

              phone: user?.phone as number,
              pk: user?.player.pkPlayer as number,
              username: user?.username as string,
            },
          });
        })
        .catch((e) => {});
    },
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

type TResponse = {
  login: {
    token: string;
    user: {
      username: string;
      phone: number;
      firstName: string;
      lastName: string;
      email: string;
      player: {
        pkPlayer: number;
      };
    };
    success: boolean;
    errors: unknown;
  };
};
