import { TextInputProps, ButtonProps } from "react-native-paper";
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { MapViewProps } from "react-native-maps";
import { DropDownPickerProps } from "../types";
export type getElementType<T> = T extends "TextField"
  ? TTextFiledProps
  : T extends "SubmitButton"
  ? TSubmitButtonProps
  : T extends "DatePicker"
  ? TDatePickerProps
  : T extends "DropDown"
  ? Omit<DropDownPickerProps<number>, "open" | "setOpen" | "value" | "setValue">
  : MapViewProps;
export type TElements =
  | "TextField"
  | "SubmitButton"
  | "DatePicker"
  | "MapView"
  | "ImagePicker"
  | "DropDown"
  | "custom";
export type TTextFiledProps = {} & Partial<TextInputProps>;

export type TSubmitButtonProps = {
  onSubmit?: () => void;
  label: string;
} & Partial<ButtonProps>;

export type TDatePickerProps = {} & (
  | IOSNativeProps
  | AndroidNativeProps
  | WindowsNativeProps
);

export type TMapViewProps = {} & MapViewProps;
