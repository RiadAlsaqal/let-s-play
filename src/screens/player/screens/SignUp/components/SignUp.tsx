import { View, StyleSheet } from "react-native";
import { useMutation } from "@src/shared/hooks";
import { SignupValidationSchema } from "../utils/SignupValidationSchema";
import { SIGNUP_MUTATION } from "../querys";
import { TextInput } from "react-native-paper";
import { FormElementFactory, withFormikForm } from "@src/shared/form";
import { LOGIN_MUTATION } from "../../LogIn/querys";
import { useAuth } from "@src/shared/Auth";
export const SignUp = () => {
  const [Mutat, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const [logIn, { data: logInData }] = useMutation(LOGIN_MUTATION);
  const { saveToken, Auth } = useAuth();

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
          <FormElementFactory type="ImagePicker" name="Image" />
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
      Image,
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
      })
        .then(() =>
          logIn({
            variables: {
              email,
              password,
            },
          })
        )
        .then((e) => {
          saveToken?.({
            key: "token",
            value: e.data?.login?.token as string,
          });
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
      Image: undefined,
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
  Image?: FormData;
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
