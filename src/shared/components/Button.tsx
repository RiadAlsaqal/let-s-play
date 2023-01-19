import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { withTheme } from "../HOC";
const ButtonNoTheme: React.FC<ButtonProps> = (props) => {
  return <Button mode="contained" {...props} />;
};

export const MyButton = withTheme(ButtonNoTheme);
