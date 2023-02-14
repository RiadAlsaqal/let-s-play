import { NavigationProp } from "@react-navigation/native";

export type TNavigation<T extends ReactNavigation.RootParamList> =
  NavigationProp<T>;
