import React from "react";
import { ButtonMutation } from "./index";
import { ACCEPT_FRIEND_MUTATION } from "../querys";
export const ButtonAcceptFriend: React.FC<TProps> = ({ pk }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: ACCEPT_FRIEND_MUTATION,
        Options: {
          variables: {
            playerPk: pk,
          },
        },
      }}
    >
      accept
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
};
