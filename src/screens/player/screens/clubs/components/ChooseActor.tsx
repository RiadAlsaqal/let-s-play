import React from "react";
import { Checkbox, IconButton } from "react-native-paper";
import { TTeam } from "../../../types";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
export const ChooseActor: React.FC<TProps> = ({ teamData, setActor }) => {
  const [checked, setChecked] = React.useState<string>();
  const handleCheck = (name: string) => {
    setChecked(name);
  };
  return (
    <>
      <View style={style.mainView}>
        <ScrollView>
          <Pressable
            style={style.View}
            onPress={() => {
              handleCheck("me");
              setActor(null);
            }}
          >
            <IconButton icon="account" />
            <Checkbox.Item
              label="me"
              status={checked === "me" ? "checked" : "unchecked"}
            />
          </Pressable>
          {teamData?.map(
            ({
              node: {
                name,
                pkTeam,
                type_: { name: typeName },
              },
            }) => (
              <Pressable
                style={style.View}
                onPress={() => {
                  handleCheck(name);
                  setActor(pkTeam);
                }}
              >
                <IconButton icon="stadium-variant" />
                <Checkbox.Item
                  label={name}
                  status={checked === name ? "checked" : "unchecked"}
                />
              </Pressable>
            )
          )}
        </ScrollView>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
  },
  View: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type TProps = {
  teamData: TTeam[];
  setActor: (pk: number | null) => void;
};
