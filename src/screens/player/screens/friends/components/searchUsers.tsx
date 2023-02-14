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
            userId: { firstName, lastName, pk, state },
          },
        }) => (
          <PlayerCard data={{ firstName, lastName, pk }}>
            <>{children({ firstName, lastName, pk, state })}</>
          </PlayerCard>
        )}
      </SearchField>
    </View>
  );
};
type TProps = {
  children: (data: TData) => React.ReactNode;
  searchFriends: boolean;
};

type TData = {
  firstName: string;
  lastName: string;
  pk: number;
  state: "friend" | " accept" | " notFriend" | "pending";
};

const style = StyleSheet.create({
  View: {
    margin: 0,
  },
});
