import React from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { withRoute } from "@src/shared/HOC";
import { RouteProp, TRootStackClubsProps } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { GET_STADIUME } from "../query";
import { TStadium, TStadiumFilter } from "../types";
import { StadiumCard } from "../components";
const StadiumProfilePure: React.FC<TProps> = ({ Route }) => {
  const { pk } = Route.params;
  const { data } = useQuery<{ stadiumFilter: TStadiumFilter }>(GET_STADIUME, {
    variables: {
      id: pk,
    },
  });
  const stadiumData = data?.stadiumFilter.data.edges[0].node;
  console.log("data", stadiumData, pk);
  return (
    <View>
      {stadiumData?.pkStadium && <StadiumCard data={stadiumData} />}

      <DateTimePicker mode="date" value={new Date()} display="spinner" />
    </View>
  );
};

export const StadiumProfile = withRoute(StadiumProfilePure);

type TProps = {
  Route: RouteProp<TRootStackClubsProps, "stadiumProfile">;
};

const style = StyleSheet.create({
  View: {},
});
