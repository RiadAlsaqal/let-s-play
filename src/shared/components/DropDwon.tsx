import React from "react";
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker";
export const DropDown: React.FC<T> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <DropDownPicker
      items={props.items}
      open={open}
      setOpen={setOpen}
      setValue={props.setValue}
      value={props.value}
    />
  );
};

type T = Omit<DropDownPickerProps<number>, "open" | "setOpen"> & {
  value: ValueType;
};
