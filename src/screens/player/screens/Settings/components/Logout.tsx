import React from "react";
import { Button } from "@src/shared/components";
import { useAuth } from "@src/shared/Auth";
export const Logout = () => {
  const { deleteToken } = useAuth();
  return <Button onPress={() => deleteToken?.()}>logout </Button>;
};
