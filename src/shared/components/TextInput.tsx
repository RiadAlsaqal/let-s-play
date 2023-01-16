import React from "react";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";
export const MyTextInput: React.FC<Omit<TextInputProps, "theme">> = (props) => {
  const theme = useTheme();
  return <TextInput mode="outlined" {...props} theme={theme} label="asd" />;
};
