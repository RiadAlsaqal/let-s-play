import { PlayerCard } from "@src/screens/player/components";
import { MyText } from "@src/shared/components";
import { useQuery } from "@src/shared/hooks";
import React from "react";
import { View } from "react-native";
import { ButtonAcceptFriend, ButtonRejectFriend } from "../components";
import { GET_FRIENDS_REQUEST_QUERY } from "../querys";

export const FriendsRequistList = () => {
  const { data, refetch } = useQuery<TData>(GET_FRIENDS_REQUEST_QUERY);
  const friendsData = data?.myRequestFriend?.data?.edges;
  return (
    <View>
      {friendsData && friendsData.length > 0 ? (
        friendsData?.map(
          ({
            node: {
              friends: {
                pkPlayer,
                userId: { email, firstName, lastName, username },
              },
            },
          }) => (
            <PlayerCard data={{ firstName, lastName, pk: pkPlayer }}>
              <View style={{ flexDirection: "row" }}>
                <ButtonAcceptFriend pk={pkPlayer} refetch={refetch} />
                <ButtonRejectFriend
                  pk={pkPlayer}
                  refetch={refetch}
                  text="Reject"
                />
              </View>
            </PlayerCard>
          )
        )
      ) : (
        <MyText variant="headlineMedium" style={{ alignSelf: "center" }}>
          there is no friends requiest
        </MyText>
      )}
    </View>
  );
};

type TProps = {};

type TData = {
  myRequestFriend: {
    data: {
      edges: [
        {
          node: {
            friends: {
              userId: {
                firstName: string;
                lastName: string;
                email: string;
                username: string;
              };
              pkPlayer: number;
            };
          };
        }
      ];
    };
    message: string;
    status: number;
  };
};
