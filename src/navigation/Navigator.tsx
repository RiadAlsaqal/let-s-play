import React from "react";
import { NotAuthScreen } from "./NotAuthScreen";
import { AuthScreens } from "./AuthScreens";
import { useAuth } from "@src/shared/Auth";
export const Navigator = () => {
  const { Auth } = useAuth();
  return Auth ? <AuthScreens /> : <NotAuthScreen />;
};
