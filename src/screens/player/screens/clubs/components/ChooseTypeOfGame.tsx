import { MyText } from "@src/shared/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

export const ChooseTypeOfGame: React.FC<TProps> = ({
  state: { setValue, value },
}) => {
  return (
    <View style={style.View}>
      <MyText variant="headlineLarge"> choose game</MyText>
      <SegmentedButtons
        buttons={[
          { value: "1", icon: "soccer", label: "Football" },
          { value: "2", icon: "basketball", label: "Basketball" },
          { value: "3", icon: "tennis-ball", label: "Tennis" },
        ]}
        onValueChange={setValue}
        value={value}
      />
    </View>
  );
};

type TProps = {
  state: {
    value: string;
    setValue: (value: string) => void;
  };
};

const style = StyleSheet.create({
  View: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
