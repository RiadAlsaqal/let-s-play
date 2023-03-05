import React from "react";
import { NotAuthScreen } from "./NotAuthScreen";
import { AuthScreens } from "./AuthScreens";
import { useAuth } from "@src/shared/Auth";
import { Loader } from "@src/shared/components";
export const Navigator = () => {
  const { Auth } = useAuth();
  if (Auth === "loading") return <Loader />;
  return Auth ? <AuthScreens /> : <NotAuthScreen />;
};
