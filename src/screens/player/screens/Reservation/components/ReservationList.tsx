import React from "react";

import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TSTackReservation } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { ReservationCard } from "../components";
import { GET_MY_RESERVATION } from "../query";
import { TMyReservationData } from "../types";
import { ScrollView, View } from "react-native";
import { IconButton } from "react-native-paper";
const ReservationListPure: React.FC<TProps> = ({ navigation, team }) => {
  const { data } = useQuery<TMyReservationData>(GET_MY_RESERVATION, {
    variables: {
      teamReserve: team,
    },
  });
  const reservationData = data?.myReservation.data.edges;
  return (
    <View>
      <ScrollView>
        {reservationData?.map((data) => (
          <ReservationCard data={data}>
            <IconButton
              icon="arrow-right"
              onPress={() => {
                navigation.navigate("ReservationProfle", {
                  data,
                });
              }}
            />
          </ReservationCard>
        ))}
      </ScrollView>
    </View>
  );
};

export const ReservationList = withNavigation(ReservationListPure);

type TProps = {
  navigation: TNavigation<TSTackReservation>;
  team: boolean;
};
