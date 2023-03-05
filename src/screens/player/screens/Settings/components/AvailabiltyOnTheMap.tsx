import React from "react";
import { Switch, MyText } from "@src/shared/components";
import { useMutation, useQuery } from "@src/shared/hooks";
import { MY_DATA_QUERY, AVAILABLE_ON_MAP } from "../query";
import { StyleSheet, View } from "react-native";
export const AvailabiltyOnTheMap = () => {
  const { data, refetch } = useQuery<TResponse>(MY_DATA_QUERY);
  const [change] = useMutation(AVAILABLE_ON_MAP);
  const isAvailableOnMap =
    data?.playerMe?.data?.edges?.[0]?.node?.availableOnMap;
  const onChange = () => {
    change().then(() => refetch());
  };
  return (
    <View style={style.View}>
      <MyText> availabe on map</MyText>
      <Switch value={isAvailableOnMap} onValueChange={onChange} />
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
type TResponse = {
  playerMe: {
    data: {
      edges: {
        node: {
          availableOnMap: boolean;
          userId: {
            username: string;
            firstName: string;
            lastName: string;
            email: string;
          };
        };
      }[];
    };
  };
};
