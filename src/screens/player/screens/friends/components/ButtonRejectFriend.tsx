import React from "react";
import { ButtonMutation } from "./index";
import { REJECT_FRIEND_MUTATION } from "../querys";
export const ButtonRejectFriend: React.FC<TProps> = ({ pk }) => {
  return (
    <ButtonMutation
      query={{
        Mutation: REJECT_FRIEND_MUTATION,
        Options: { variables: { playerPk: pk } },
      }}
    >
      reject
    </ButtonMutation>
  );
};

type TProps = {
  pk: number;
};
