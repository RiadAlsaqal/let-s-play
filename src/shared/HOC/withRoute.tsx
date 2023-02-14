import React from "react";
import { useRoute, RouteProp, ParamListBase } from "@react-navigation/native";
export function withRoute<T, A extends ParamListBase, B extends keyof A>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: Omit<T, "Route">) => {
    const Route = useRoute<RouteProp<A, B>>();

    return <WrappedComponent {...(props as T)} Route={Route} />;
  };
}
