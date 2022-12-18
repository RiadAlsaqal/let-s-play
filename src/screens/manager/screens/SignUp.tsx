import { View, StyleSheet } from "react-native";

import { Box, Input } from "native-base";
import { withFormik, Form, Field, FormikProps } from "formik";
const SignUp: React.FC<FormikProps<TSingUpForm>> = ({ values }) => {
  return (
    <Box alignItems="center">
      <Input isHovered={true} variant="outline">
        {" "}
        First Name
      </Input>
    </Box>
  );
};

export const X = withFormik({ handleSubmit: () => console.log("hiii") })(
  SignUp
);

type TSingUpForm = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};
