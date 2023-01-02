import React from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Text,
  useTheme,
  MD3Theme,
  Button,
} from "react-native-paper";
import { Field, FieldMetaProps, FieldProps, FormikHandlers } from "formik";
import { DatePicker } from "./index";
import {
  TElements,
  getElementType,
  TSubmitButtonProps,
  TDatePickerProps,
  TTextFiledProps,
} from "./types";
const ErrorMessage = ({ meta, theme }: TErrorMessage) => (
  <>
    {meta.touched && meta.error && (
      <Text variant="labelMedium" style={{ color: theme.colors.error }}>
        {meta.error}
      </Text>
    )}
  </>
);
const ElementFactory = <T extends TElements>({
  FieldProps,
  elementProps,
  type,
}: TElementFactory<T>) => {
  const element = {
    TextField: (
      <TextInput
        onChangeText={FieldProps.form.handleChange(FieldProps.field.name)}
        onKeyPress={FieldProps.form.handleBlur(FieldProps.field.name)}
        value={FieldProps.field.value}
        {...elementProps}
        style={style.TextInput}
      />
    ),
    SubmitButton: (
      <Button
        onPress={() => {
          console.log("hi");
        }}
      >
        {(elementProps as TSubmitButtonProps)?.label}
      </Button>
    ),
    DatePicker: (
      <DatePicker elementProps={elementProps} FieldProps={FieldProps} />
    ),
  };
  return <View>{element[type as TElements]}</View>;
};
export const FormElementFactory = <T extends TElements>(
  props: TFormElementFactory<T>
) => {
  const theme = useTheme();

  return (
    <Field name={props.name}>
      {(FieldProps: FieldProps) => {
        return (
          <View style={style.view}>
            <ElementFactory<T> FieldProps={FieldProps} {...props} />
            <ErrorMessage meta={FieldProps.meta} theme={theme} />
          </View>
        );
      }}
    </Field>
  );
};
const style = StyleSheet.create({
  TextInput: {
    minWidth: "70%",
  },
  view: {
    padding: 10,
  },
});
type TErrorMessage = {
  meta: FieldMetaProps<any>;
  theme: MD3Theme;
};

type TElementFactory<T extends TElements> = {
  FieldProps: FieldProps;
} & Omit<TFormElementFactory<T>, "name">;

type TFormElementFactory<T extends TElements> = {
  name: string;
  type: T;
  elementProps?: getElementType<T>;
};
