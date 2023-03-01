import React from "react";
import { DataTable, IconButton } from "react-native-paper";
import { ButtonMutation } from "@src/shared/components";
import { TDuration } from "../types";
import { converteFrom12To24 } from "../utils";

export const ReservationTable: React.FC<TProps> = ({ columns, data }) => {
  return (
    <>
      <DataTable>
        <DataTable.Header>
          {columns.map((title) => (
            <DataTable.Title>{title}</DataTable.Title>
          ))}
        </DataTable.Header>
        {data?.map(
          ({ node: { available, endTime, pkDuration, price, startTime } }) => (
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
      {/* <ButtonMutation query={} > reservation</ButtonMutation> */}
    </>
  );
};

type TProps = {
  columns: string[];
  data: TDuration[];
};
