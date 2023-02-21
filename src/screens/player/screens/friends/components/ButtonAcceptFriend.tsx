import React from "react";
import { ButtonMutation } from "@src/shared/components";
import { ACCEPT_FRIEND_MUTATION } from "../querys";
export const ButtonAcceptFriend: React.FC<TProps> = ({ pk, refetch }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: ACCEPT_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
          onCompleted: refetch,
        },
      }}
    >
      accept
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
  refetch: () => void;
};
