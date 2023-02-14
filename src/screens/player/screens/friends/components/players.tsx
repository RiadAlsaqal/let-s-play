import React from "react";
import { SearchUsers } from "./searchUsers";
import {
  ButtonAdd,
  ButtonAcceptFriend,
  ButtonRejectFriend,
  ButtonCansel,
} from "./index";

const mapStateToButton = (pk: number, state: tState) => {
  const config = {
    accept: (
      <>
        <ButtonRejectFriend pk={pk} /> <ButtonAcceptFriend pk={pk} />
      </>
    ),
    notFriend: <ButtonAdd pk={pk} />,
    pending: <ButtonCansel pk={pk} />,
  };
  return config[state as keyof typeof config];
};

export const playerScreen = () => {
  return (
    <SearchUsers searchFriends={false}>
      {({ firstName, lastName, pk, state }) => {
        console.log("state", state);
        return mapStateToButton(pk, state);
      }}
    </SearchUsers>
  );
};

type tState = "friend" | " accept" | " notFriend" | "pending";
