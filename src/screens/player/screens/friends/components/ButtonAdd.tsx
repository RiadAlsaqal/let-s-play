import React from "react";
import { ADD_FRIEND_MUTATION } from "../querys";
import { ButtonMutation } from "@src/shared/components";

export const ButtonAdd: React.FC<TProps> = ({ pk, refetch }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: ADD_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
          onCompleted: refetch,
        },
      }}
    >
      add friend
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
  refetch: () => void;
};
