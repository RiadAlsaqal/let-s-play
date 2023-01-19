import React from "react";
import { useNavigation } from "@react-navigation/native";
export function withNavigation<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: Omit<T, "navigation">) => {
    const navigation = useNavigation();

    return <WrappedComponent {...(props as T)} navigation={navigation} />;
  };
}
