import React from "react";
import { Button, TButtonProps } from "@src/shared/components";
import { useMutation, MutationTypes } from "@src/shared/hooks";
export const ButtonMutation: React.FC<TProps> = ({
  query: { Mutation, Options },
  children,
}) => {
  const [mutation, { data }] = useMutation(Mutation);
  return <Button onPress={() => mutation(Options)}>{children}</Button>;
};

type TProps = {
  query: MutationTypes;
} & Omit<TButtonProps, "theme">;
