import React from "react";
import { SearchUsers } from "./searchUsers";
import {
  ButtonAdd,
  ButtonAcceptFriend,
  ButtonRejectFriend,
  ButtonCansel,
} from "./index";
import { useClient } from "@src/shared/Apollo";
import { SEARCH_PLAYER_QUERY } from "../querys";
import { tStatePlayer } from "@src/shared/types";

const mapStateToButton = (
  pk: number,
  state: tStatePlayer,
  refetch: () => void
) => {
  const config = {
    accept: (
      <>
        <ButtonRejectFriend pk={pk} refetch={refetch} text="reject" />
        <ButtonAcceptFriend pk={pk} refetch={refetch} />
      </>
    ),
    notFriend: <ButtonAdd pk={pk} refetch={refetch} />,
    pending: <ButtonCansel pk={pk} refetch={refetch} />,
  };
  return config[state as keyof typeof config];
};

export const playerScreen = () => {
  const client = useClient();
  const refetch = () => {
    client.refetchQueries({ include: [SEARCH_PLAYER_QUERY] });
  };

  return (
    <SearchUsers searchFriends={false}>
      {({ firstName, lastName, pk, state }) => {
        return mapStateToButton(pk, state, refetch);
      }}
    </SearchUsers>
  );
};
