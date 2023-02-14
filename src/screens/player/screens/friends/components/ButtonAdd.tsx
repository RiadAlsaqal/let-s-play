import React from "react";
import { ADD_FRIEND_MUTATION } from "../querys";
import { ButtonMutation } from "./ButtonMutation";

export const ButtonAdd: React.FC<TProps> = ({ pk }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: ADD_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
        },
      }}
    >
      add friend
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
};
