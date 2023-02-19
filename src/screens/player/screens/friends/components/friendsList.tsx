import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useQuery } from "@src/shared/hooks";
import { GET_ALL_FRIENDS_QUERY } from "../querys";
import { PlayerCard } from "../../../components";
import { AntDesign } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { ButtonInfo } from "./index";
export const FriendsList = () => {
  const { data } = useQuery<TData>(GET_ALL_FRIENDS_QUERY);

  return (
    <ScrollView>
      {data?.allFriend?.data?.edges?.map(
        ({
          node: {
            friends: {
              userId: { firstName, lastName, pk },
            },
          },
        }) => {
          return (
            <>
              <PlayerCard data={{ firstName, lastName, pk }}>
                <View style={style.View}>
                  <IconButton
                    onPress={() => {}}
                    mode="contained-tonal"
                    icon={() => <AntDesign size={30} name="message1" />}
                  />
                  <ButtonInfo name={firstName + " " + lastName} pk={pk} />
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
            userId: {
              firstName: string;
              lastName: string;
              pk: number;
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
