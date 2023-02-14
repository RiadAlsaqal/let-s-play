import React from "react";
import { Switch as PaperSwitch, SwitchProps } from "react-native-paper";
import { withTheme } from "../HOC";

const SwitchWithoutTheme: React.FC<TProps> = (props) => {
  return <PaperSwitch {...props} />;
};
export const Switch = withTheme(SwitchWithoutTheme);

type TProps = SwitchProps;
