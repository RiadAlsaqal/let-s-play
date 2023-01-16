import { TextInputProps, ButtonProps } from "react-native-paper";
import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { MapViewProps } from "react-native-maps";

export type getElementType<T> = T extends "TextField"
  ? TTextFiledProps
  : T extends "SubmitButton"
  ? TSubmitButtonProps
  : T extends "DatePicker"
  ? TDatePickerProps
  : TMapViewProps;
export type TElements = "TextField" | "SubmitButton" | "DatePicker" | "MapView";
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
