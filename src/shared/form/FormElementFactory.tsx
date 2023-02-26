import React, { useState } from "react";
import { StyleSheet, View, ViewProps, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Field, FieldMetaProps, FieldProps } from "formik";
import { DatePicker } from "./index";
import {
  TElements,
  getElementType,
  TSubmitButtonProps,
  TDatePickerProps,
  TTextFiledProps,
} from "./types";
import { DropDownPickerProps, MD3Theme, TLocation } from "../types";
import { MapView, Button, TextInput, DropDown } from "../components";
import * as ImagePicker from "expo-image-picker";
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
  children,
}: TElementFactory<T>) => {
  const handleChangeLocation = (location: TLocation) => {
    FieldProps.form.setFieldValue(FieldProps.field.name, location);
  };
  const handleChoceImage = (img: ImagePicker.ImagePickerResult) => {
    const formData = new FormData();
    formData.append("picture", {
      uri: img.assets![0].uri,
      type: img.assets![0].type,
      name: img.assets![0].fileName,
    } as any);

    FieldProps.form.setFieldValue(FieldProps.field.name, formData);
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
    ImagePicker: (
      <>
        <Image />
        <Button
          onPress={async () => {
            const image = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              base64: true,
            });
            handleChoceImage(image);
          }}
        >
          pick photo
        </Button>
      </>
    ),
    DropDown: (
      <DropDown
        {...(elementProps as DropDownPickerProps<number>)}
        value={FieldProps.field.value as number}
        setValue={(x) => {
          FieldProps.form.setFieldValue(
            FieldProps.field.name,
            x(FieldProps.field.value)
          );
        }}
      />
    ),
    custom: children as React.ReactElement,
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
          <View style={style.view} {...props.containerProps}>
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
  children?: React.ReactElement;
  FieldProps: FieldProps;
} & Omit<TFormElementFactory<T>, "name">;

type TFormElementFactory<T extends TElements> = {
  name: string;
  type: T;
  elementProps?: getElementType<T>;
  containerProps?: ViewProps;
  children?: React.ReactElement;
};
