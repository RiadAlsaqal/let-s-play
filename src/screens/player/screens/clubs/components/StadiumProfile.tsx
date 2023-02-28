import React from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "@src/shared/components";
import { useLazyQuery } from "@src/shared/hooks";
import { withRoute, withTheme } from "@src/shared/HOC";
import { MD3Theme, RouteProp, TRootStackClubsProps } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { GET_STADIUME, GET_AVAILABLE_DURATION_FOR_STADIUM } from "../query";
import { TStadium, TStadiumFilter } from "../types";
import { StadiumCard } from "../components";
import { flowRight } from "lodash";
import moment from "moment";
const StadiumProfilePure: React.FC<TProps> = ({ Route, theme }) => {
  const { pk } = Route.params;
  const [date, setDate] = React.useState<Date>(new Date());
  const [openCalender, setOpenCalender] = React.useState<boolean>(false);
  const { data } = useQuery<{ stadiumFilter: TStadiumFilter }>(GET_STADIUME, {
    variables: {
      id: pk,
    },
  });
  const [getDuration] = useLazyQuery<TDutationData>(
    GET_AVAILABLE_DURATION_FOR_STADIUM
  );
  const stadiumData = data?.stadiumFilter.data.edges[0].node;
  const dateAfterMoths = new Date();
  date.setDate(date.getMonth() + 6);
  console.log("data", stadiumData, pk);

  return (
    <View style={style.View}>
      {stadiumData?.pkStadium && (
        <StadiumCard
          data={stadiumData}
          styleView={{ backgroundColor: theme.colors.surfaceVariant }}
        />
      )}

      <Button
        onPress={() => {
          setOpenCalender(true);
        }}
      >
        choice time to reservation
      </Button>
      {openCalender && (
        <DateTimePicker
          mode="date"
          value={date}
          display="spinner"
          minimumDate={date}
          maximumDate={dateAfterMoths}
          onChange={() => {
            setOpenCalender(false);
            getDuration({
              variables: {
                stadiumId: pk,
                date: date,
              },
            });
          }}
        />
      )}
    </View>
  );
};

export const StadiumProfile = flowRight(
  withTheme,
  withRoute
)(StadiumProfilePure);

type TProps = {
  Route: RouteProp<TRootStackClubsProps, "stadiumProfile">;
  theme: MD3Theme;
};

const style = StyleSheet.create({
  View: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});

type TDutationData = {
  avaliableDurationByStadium: {
    data: {
      edges: {
        node: {
          price: number;
          startTime: Date;
          endTime: Date;
          pkDuration: number;
          available: boolean;
        }[];
      };
    };
    status: number;
    message: string;
  };
};
