import React from "react";

import { SearchField } from "@src/shared/components";
import { StyleSheet, View } from "react-native";
import { SEARCH_PLAYER_QUERY } from "../querys";
import { PlayerCard } from "./PlayerCard";
export const SearchUsers: React.FC<TProps> = ({ children, searchFriends }) => {
  const [value, setValue] = React.useState("");

  const handleOnChangeText = (e: string) => {
    setValue(e);
  };
  return (
    <View style={style.View}>
      <SearchField<"serchPlayer", "userId", TData>
        value={value}
        onChangeText={handleOnChangeText}
        query={{
          query: SEARCH_PLAYER_QUERY,
          queryOptions: {
            variables: {
              playerName: value,
              withoutFriend: searchFriends,
            },
          },
        }}
      >
        {({
          node: {
            state,
            userId: { firstName, lastName },
            pkPlayer,
          },
        }) => {
          return (
            <PlayerCard data={{ firstName, lastName, pk: pkPlayer }}>
              <>{children({ firstName, lastName, pk: pkPlayer, state })}</>
            </PlayerCard>
          );
        }}
      </SearchField>
    </View>
  );
};
type TProps = {
  children: (data: TParameters) => React.ReactNode;
  searchFriends: boolean;
};

type TData = {
  state: "friend" | " accept" | " notFriend" | "pending";
  pkPlayer: number;
  userId: {
    firstName: string;
    lastName: string;
  };
};

type TParameters = {
  state: "friend" | " accept" | " notFriend" | "pending";
  pk: number;
  firstName: string;
  lastName: string;
};

const style = StyleSheet.create({
  View: {
    margin: 0,
  },
});
