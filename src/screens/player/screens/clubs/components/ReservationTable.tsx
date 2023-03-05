import React from "react";
import { DataTable, IconButton } from "react-native-paper";
import { ButtonMutation } from "@src/shared/components";
import { TDuration } from "../types";
import { converteFrom12To24 } from "../utils";
import { StyleSheet, View } from "react-native";
const DataColumns: string[] = ["from", "to", "available", "price"];

export const ReservationTable: React.FC<TProps> = ({ data, setValue }) => {
  const [selected, setselected] = React.useState<number>();
  return (
    <View style={style.View}>
      <DataTable>
        <DataTable.Header>
          {DataColumns.map((title) => (
            <DataTable.Title>{title}</DataTable.Title>
          ))}
        </DataTable.Header>
        {data?.map(
          ({ node: { available, endTime, pkDuration, price, startTime } }) => (
            <DataTable.Row
              onPress={() => {
                available && setselected(pkDuration);
                setValue({
                  node: { available, endTime, pkDuration, price, startTime },
                });
              }}
              style={{
                backgroundColor:
                  selected === pkDuration ? "lightgray" : "white",
              }}
            >
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
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

type TProps = {
  data: TDuration[];
  setValue: (DurationPk: TDuration) => void;
};
