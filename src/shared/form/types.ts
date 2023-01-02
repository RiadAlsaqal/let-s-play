export type getElementType<T> = T extends "TextField"
  ? TTextFiledProps
  : T extends "SubmitButton"
  ? TSubmitButtonProps
  : TDatePickerProps;
export type TElements = "TextField" | "SubmitButton" | "DatePicker";
export type TTextFiledProps = {
  placeholder: string;
};

export type TSubmitButtonProps = {
  onSubmit?: () => void;
  label: string;
};

export type TDatePickerProps = {};
