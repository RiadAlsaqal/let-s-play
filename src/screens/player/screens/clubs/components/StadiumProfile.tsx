import React from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "@src/shared/components";
import { useLazyQuery } from "@src/shared/hooks";
import { withRoute, withTheme } from "@src/shared/HOC";
import { MD3Theme, RouteProp, TRootStackClubsProps } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { GET_STADIUME, GET_AVAILABLE_DURATION_FOR_STADIUM } from "../query";
import { TDutationData, TStadiumFilter } from "../types";
import { StadiumCard, ReservationTable } from "../components";
import { addMothsToCurrentDate, reComposeDate } from "../utils";
import { flowRight } from "lodash";
import moment from "moment";

const DataColumns: string[] = ["from", "to", "available", "price"];

const StadiumProfilePure: React.FC<TProps> = ({ Route, theme }) => {
  const { pk } = Route.params;
  const [date, setDate] = React.useState<Date>(new Date());
  const [openCalender, setOpenCalender] = React.useState<boolean>(false);
  const [openDataTable, setOpenDataTable] = React.useState<boolean>(false);
  const { data } = useQuery<{ stadiumFilter: TStadiumFilter }>(GET_STADIUME, {
    variables: {
      id: pk,
    },
  });
  const [getDuration, { data: DurationData }] = useLazyQuery<TDutationData>(
    GET_AVAILABLE_DURATION_FOR_STADIUM
  );
  const duration = DurationData?.avaliableDurationByStadium.data.edges;
  const stadiumData = data?.stadiumFilter.data.edges[0].node;

  const handleOnChange = (event: DateTimePickerEvent, date?: Date) => {
    setOpenCalender(false);

    if (event.type === "set" && date) {
      getDuration({
        variables: {
          stadiumId: pk,
          date: reComposeDate(date),
        },
      })
        .then(() => {
          setOpenDataTable(true);
        })
        .catch(() => {
          setOpenDataTable(false);
        });
      date && setDate(date);
    }
  };

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
        Choose a time to reservation
      </Button>
      {openCalender && (
        <DateTimePicker
          mode="date"
          value={date}
          minimumDate={new Date()}
          maximumDate={addMothsToCurrentDate()}
          onChange={handleOnChange}
          dateFormat="day month year"
        />
      )}
      {openDataTable && duration && duration?.length > 0 && (
        <ReservationTable columns={DataColumns} data={duration} />
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
