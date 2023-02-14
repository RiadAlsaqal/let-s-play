import React from "react";
import { ButtonMutation } from "./index";
import { REJECT_FRIEND_MUTATION } from "../querys";
export const ButtonCansel: React.FC<TProps> = ({ pk }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: REJECT_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
        },
      }}
    >
      cansele
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
};
