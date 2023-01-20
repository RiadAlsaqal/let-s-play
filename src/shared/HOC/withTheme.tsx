import React from "react";
import { useTheme } from "react-native-paper";

export function withTheme<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: Omit<T, "theme">) => {
    const theme = useTheme();

    return <WrappedComponent {...(props as T)} theme={theme} />;
  };
}
