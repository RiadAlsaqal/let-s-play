import { View, StyleSheet, Text, Pressable } from "react-native";
import { useMutation, gql } from "@apollo/client";
import {
  withFormikForm,
  TFormikProps,
  FormElementFactory,
} from "./../../../../src/shared/form";
import { SignupValidationSchema } from "./utils/SignupValidationSchema";
import { useEffect } from "react";

const SIGNUP_MUTATION = gql`
  mutation myMutation(
    $lat: String!
    $lon: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: Int!
    $password: String!
  ) {
    SignUpPlyer(
      playerData: {
        user: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          password: $password
        }
        locationLat: $lat
        locationLong: $lon
      }
    ) {
      data {
        userId {
          username
        }
        locationLat
        locationLong
        id
      }
      message
      status
    }
  }
`;

export const SignUp: React.FC<TSingUpForm> = ({}) => {
  const [myMutat, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  useEffect(() => {
    console.log("data", data, loading, error);
  }, [data, loading, error]);
  const Form = withFormikForm<{}, TValues>({
    children: (props) => {
      console.log(props);

      return (
        <View style={style.form}>
          <FormElementFactory
            elementProps={{
              label: "first Name",
            }}
            type="TextField"
            name="firstName"
            {...props}
          />
          <FormElementFactory
            elementProps={{
              placeholder: "last name",
            }}
            type="TextField"
            name="lastName"
            {...props}
          />
          <FormElementFactory
            elementProps={{
              placeholder: "email",
            }}
            type="TextField"
            name="email"
            {...props}
          />
          <FormElementFactory
            elementProps={{
              placeholder: "password",
            }}
            type="TextField"
            name="password"
            {...props}
          />
          <FormElementFactory
            elementProps={{
              placeholder: "password",
            }}
            type="TextField"
            name="phone"
            {...props}
          />
          <FormElementFactory type="DatePicker" name="DatePicker" {...props} />
          <FormElementFactory type="MapView" name="MapView" {...props} />

          <FormElementFactory
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
    handleSubmit: ({
      DatePicker,
      MapView,
      email,
      firstName,
      lastName,
      password,
      phone,
    }) => {
      console.log();
      myMutat({
        variables: {
          lat: MapView?.latitude,
          lon: MapView?.longitude,
          firstName,
          lastName,
          email,
          phone: 4544,
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
      password: "asdsadad",
      phone: "asdad",
    }),
  });
  return <Form />;
};

const style = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type TSingUpForm = TValues & Partial<TFormikProps<TValues>>;

type TValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  DatePicker: Date;
  MapView: TLocation | undefined;
  phone: string;
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const Home = ({ route, navigation }: any) => (
  <View>
    <Pressable onPress={() => navigation.navigate("SignUp")}>
      <Text>hi</Text>
    </Pressable>
  </View>
);

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "50%",
    width: "100%",
  },
});
