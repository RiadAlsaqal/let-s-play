import React from "react";
import { NotAuthScreen } from "./NotAuthScreen";
import { useAuth } from "@src/shared/Auth";
export const Navigator = () => {
  const auth = useAuth();
  return <NotAuthScreen />;
};
