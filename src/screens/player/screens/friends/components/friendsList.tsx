import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useQuery } from "@src/shared/hooks";
import { GET_ALL_FRIENDS_QUERY } from "../querys";
import { PlayerCard } from "../../../components";
import { AntDesign } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { ButtonInfo } from "./index";
import { RefreshControl } from "react-native-gesture-handler";
export const FriendsList = () => {
  const { data, refetch } = useQuery<TData>(GET_ALL_FRIENDS_QUERY);
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = () => {
    refetch().then(() => {
      setRefreshing(false);
    });
    setRefreshing;
  };
  useEffect(() => {
    refetch();
  });
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {data?.allFriend?.data?.edges?.map(
        ({
          node: {
            friends: {
              pkPlayer,
              userId: { firstName, lastName },
            },
          },
        }) => {
          return (
            <>
              <PlayerCard data={{ firstName, lastName, pk: pkPlayer }}>
                <View style={style.View}>
                  <IconButton
                    onPress={() => {}}
                    mode="contained-tonal"
                    icon={() => <AntDesign size={30} name="message1" />}
                  />
                  <ButtonInfo name={firstName + " " + lastName} pk={pkPlayer} />
                </View>
              </PlayerCard>
            </>
          );
        }
      )}
    </ScrollView>
  );
};

type TData = {
  allFriend: {
    data: {
      edges: {
        node: {
          friends: {
            pkPlayer: number;

            userId: {
              firstName: string;
              lastName: string;
            };
          };
        };
      }[];
    };
  };
};

const style = StyleSheet.create({
  View: { width: 100, flexDirection: "row" },
});
