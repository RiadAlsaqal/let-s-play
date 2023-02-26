import React from "react";

import { SearchField } from "@src/shared/components";
import { StyleSheet, View } from "react-native";
import { SEARCH_PLAYER_QUERY, SEARCH_FRIEND_QUERY } from "../querys";
import { tStatePlayer } from "@src/shared/types";
import { PlayerCard } from "../../../components/PlayerCard";
import { TQuery } from "@src/shared/types";
export const SearchUsers: React.FC<TProps> = ({ children, searchFriends }) => {
  const [value, setValue] = React.useState("");

  const handleOnChangeText = (e: string) => {
    setValue(e);
  };
  const extractData = (
    FriendSearch: true | undefined,
    data: choseType<typeof searchFriends>
  ): TData => {
    console.log("friend", FriendSearch, data);
    if (FriendSearch) {
      return {
        pkPlayer: (data as TFriend).node.friends.pkPlayer,
        state: (data as TFriend).node.friends.state,
        userId: (data as TFriend).node.friends.userId,
      };
    } else {
      return data as TData;
    }
  };
  return (
    <View style={style.View}>
      <SearchField<
        choseQuery<typeof searchFriends>,
        "userId",
        choseType<typeof searchFriends>
      >
        value={value}
        onChangeText={handleOnChangeText}
        query={{
          query: searchFriends ? SEARCH_FRIEND_QUERY : SEARCH_PLAYER_QUERY,
          queryOptions: {
            variables: searchFriends
              ? {
                  playerName: value,
                }
              : {
                  playerName: value,

                  withoutFriend: false,
                },
          },
        }}
      >
        {(data) => {
          const {
            pkPlayer,
            state,
            userId: { firstName, lastName },
          } = extractData(searchFriends, data as unknown as TData | TFriend);
          return (
            <PlayerCard data={{ firstName, lastName, pk: pkPlayer }}>
              <>
                {children({
                  firstName,
                  lastName,
                  pk: pkPlayer,
                  state,
                })}
              </>
            </PlayerCard>
          );
        }}
      </SearchField>
    </View>
  );
};
type TProps = {
  children: (data: TParameters) => React.ReactNode;
  searchFriends?: true;
};

type TData = {
  state: tStatePlayer;
  pkPlayer: number;
  userId: {
    firstName: string;
    lastName: string;
  };
};

type TParameters = {
  state: tStatePlayer;
  pk: number;
  firstName: string;
  lastName: string;
};

const style = StyleSheet.create({
  View: {
    margin: 0,
  },
});

type choseQuery<T extends boolean | undefined> = T extends boolean
  ? "getFriendByName"
  : "serchPlayer";

type choseType<T extends boolean | undefined> = T extends boolean
  ? TFriend
  : TData;
type TFriend = {
  node: {
    friends: {
      state: tStatePlayer;
      pkPlayer: number;
      userId: {
        firstName: string;
        lastName: string;
      };
    };
  };
};
