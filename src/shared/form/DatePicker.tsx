import React, { MutableRefObject, useState } from "react";
import { View, TouchableHighlight } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { Button, Text } from "react-native-paper";
import { FieldProps } from "formik";
import { getElementType, TElements } from "./types";
export const DatePicker = <T extends TElements>({
  FieldProps: { field, form, meta },
  elementProps,
}: TDatePicker<T>) => {
  const [open, setOpen] = useState(false);
  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    handleClose();
    form.setFieldValue(field.name, date);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <View>
      <Text>Birthday </Text>
      <Button onPress={handleOpen}>
        {moment(field.value).format("DD/MM/YYYY")}
      </Button>
      {open && (
        <DateTimePicker value={field.value} mode="date" onChange={onChange} />
      )}
    </View>
  );
};

type TDatePicker<T> = {
  //   reff: React.MutableRefObject<
  //     (({ event, selectedDate }: any) => void) | undefined
  //   >;
  FieldProps: FieldProps;
  elementProps: getElementType<T> | undefined;
};
