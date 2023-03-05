import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Button } from "@src/shared/components";
import React from "react";
import { addMothsToCurrentDate } from "../utils";

export const ChooseDate: React.FC<TProps> = ({ onChange, date, showDate }) => {
  const [openCalender, setOpenCalender] = React.useState<boolean>(false);

  return (
    <>
      <Button
        onPress={() => {
          setOpenCalender(true);
        }}
        mode="outlined"
        style={{
          alignSelf: "center",
        }}
      >
        {showDate ? date.toLocaleDateString() : "Choose a time to reservation"}
      </Button>
      {openCalender && (
        <DateTimePicker
          mode="date"
          value={date}
          minimumDate={new Date()}
          maximumDate={addMothsToCurrentDate()}
          onChange={(e, a) => {
            setOpenCalender(false);
            onChange(e, a);
          }}
          dateFormat="day month year"
        />
      )}
    </>
  );
};

type TProps = {
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  date: Date;
  showDate: boolean;
};
