import React from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackNotAuthScreenProps } from "../types";
export function withNavigation<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: Omit<T, "navigation">) => {
    const navigation = useNavigation();

    return <WrappedComponent {...(props as T)} navigation={navigation} />;
  };
}
