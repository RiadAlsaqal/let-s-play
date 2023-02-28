import React from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button, MyText } from "@src/shared/components";
import { useLazyQuery } from "@src/shared/hooks";
import { withRoute, withTheme } from "@src/shared/HOC";
import { MD3Theme, RouteProp, TRootStackClubsProps } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { GET_STADIUME, GET_AVAILABLE_DURATION_FOR_STADIUM } from "../query";
import { TStadium, TStadiumFilter } from "../types";
import { StadiumCard } from "../components";
import { addMothsToCurrentDate, converteFrom12To24 } from "../utils";
import { flowRight } from "lodash";
import moment from "moment";
import { DataTable, IconButton } from "react-native-paper";
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
  console.log("asd", moment().format("DD MM Y"));

  const handleOnChange = (event: DateTimePickerEvent, date?: Date) => {
    setOpenCalender(false);

    if (event.type === "set" && date) {
      let newDate: string | string[] = moment(date).format("DD MM Y");
      newDate = newDate?.split(" ");
      newDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
      getDuration({
        variables: {
          stadiumId: pk,
          date: newDate,
        },
      })
        .then(() => {
          setOpenDataTable(true);
        })
        .catch(() => {
          setOpenDataTable(false);
        });
      console.log("daaateee", newDate);
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
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>from</DataTable.Title>
            <DataTable.Title>to</DataTable.Title>
            <DataTable.Title>available</DataTable.Title>
            <DataTable.Title>price</DataTable.Title>
          </DataTable.Header>
          {duration?.map(
            ({
              node: { available, endTime, pkDuration, price, startTime },
            }) => (
              <DataTable.Row>
                <DataTable.Cell>{converteFrom12To24(startTime)}</DataTable.Cell>
                <DataTable.Cell>{converteFrom12To24(endTime)}</DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    icon={available ? "check" : "close"}
                    iconColor={available ? "green" : "red"}
                  />
                </DataTable.Cell>
                <DataTable.Cell>{price}</DataTable.Cell>
              </DataTable.Row>
            )
          )}
        </DataTable>
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
          startTime: string;
          endTime: string;
          pkDuration: number;
          available: boolean;
        };
      }[];
    };
    status: number;
    message: string;
  };
};
