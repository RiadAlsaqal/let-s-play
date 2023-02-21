import React from "react";
import { ButtonMutation } from "@src/shared/components";
import { REJECT_FRIEND_MUTATION } from "../querys";
export const ButtonCansel: React.FC<TProps> = ({ pk, refetch }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: REJECT_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
          onCompleted: refetch,
        },
      }}
    >
      cansele
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
  refetch: () => void;
};
