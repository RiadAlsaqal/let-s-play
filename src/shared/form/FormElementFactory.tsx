import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, MD3Theme } from "react-native-paper";
import { Field, FieldMetaProps, FieldProps, FormikHandlers } from "formik";
import { DatePicker } from "./index";
import {
  TElements,
  getElementType,
  TSubmitButtonProps,
  TDatePickerProps,
  TTextFiledProps,
} from "./types";
import { MapView, Button, TextInput } from "../components";
const ErrorMessage = ({ meta, theme }: TErrorMessage) => (
  <>
    {meta.touched && meta.error && (
      <Text
        variant="labelMedium"
        style={{ color: theme.colors.error, textAlign: "center" }}
      >
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
  const handleChangeLocation = (location: TLocation) => {
    FieldProps.form.setFieldValue(FieldProps.field.name, location);
  };
  const element: Record<TElements, React.ReactElement> = {
    TextField: (
      <TextInput
        onChangeText={FieldProps.form.handleChange(FieldProps.field.name)}
        onKeyPress={FieldProps.form.handleBlur(FieldProps.field.name)}
        value={FieldProps.field.value}
        {...(elementProps as TTextFiledProps)}
      />
    ),
    SubmitButton: (
      <Button
        onPress={() => FieldProps.form.handleSubmit()}
        {...(elementProps as TSubmitButtonProps)}
      >
        {(elementProps as TSubmitButtonProps)?.label}
      </Button>
    ),
    DatePicker: (
      <DatePicker elementProps={elementProps} FieldProps={FieldProps} />
    ),
    MapView: <MapView setLocation={handleChangeLocation} />,
  };
  return <>{element[type as TElements]}</>;
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

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
