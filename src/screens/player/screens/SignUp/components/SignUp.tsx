import { View, StyleSheet } from "react-native";
import { useMutation } from "@src/shared/hooks";
import { SignupValidationSchema } from "../utils/SignupValidationSchema";
import { SIGNUP_MUTATION } from "../querys";
import { TextInput } from "react-native-paper";
import { FormElementFactory, withFormikForm } from "@src/shared/form";
import { useAuth } from "@src/shared/Auth";

export const SignUp = () => {
  const [Mutat, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const Form = withFormikForm<{}, TValues>({
    children: (props) => {
      return (
        <View style={style.form}>
          <FormElementFactory
            elementProps={{
              label: "first Name",
            }}
            type="TextField"
            name="firstName"
          />
          <FormElementFactory
            elementProps={{
              label: "last name",
            }}
            type="TextField"
            name="lastName"
          />
          <FormElementFactory
            type="TextField"
            name="email"
            elementProps={{
              label: "email",
              placeholder: "email",
            }}
          />

          <FormElementFactory
            type="TextField"
            name="password"
            elementProps={{
              label: "password",
              right: <TextInput.Affix text="./100" />,
            }}
          />
          <FormElementFactory type="DatePicker" name="DatePicker" />
          <FormElementFactory type="MapView" name="MapView" />

          <FormElementFactory
            elementProps={{
              label: "click",
            }}
            type="SubmitButton"
            name="submitButton"
          />
        </View>
      );
    },
    handleSubmit: ({
      DatePicker,
      MapView,
      email,
      firstName,
      lastName,
      password,
      phone,
    }) => {
      Mutat({
        variables: {
          lat: MapView?.latitude,
          lon: MapView?.longitude,
          firstName,
          lastName,
          email,
          phone,
          password,
        },
      });
    },
    validationSchema: SignupValidationSchema,
    mapPropsToValues: (props) => ({
      firstName: "",
      lastName: "",
      email: "",
      DatePicker: new Date(),
      MapView: undefined,
      password: "",
      phone: 0,
    }),
  });
  return <Form />;
};

const style = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
  },
});

type TValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  DatePicker: Date;
  MapView: TLocation | undefined;
  phone: number;
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
