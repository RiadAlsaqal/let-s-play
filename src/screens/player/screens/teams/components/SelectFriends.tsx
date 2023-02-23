import React from "react";
import { addCheckPropertToFriends } from "../utils";
import { Images } from "../../../../../../assets/images";
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MyText, Button } from "@src/shared/components";
import { includes } from "lodash";
import { Dialog, Portal } from "react-native-paper";
export const SelectFriends: React.FC<TProps> = ({
  friends,
  setValue,
  checkedList,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [checked, setChecked] = React.useState<number[]>(
    !!checkedList && checkedList?.length > 0 ? checkedList : []
  );

  const friendsList: ({ check: boolean } & Friend)[] =
    addCheckPropertToFriends(friends);

  const handleCheck = (pk: number) => {
    setChecked((prevState) => [...prevState, pk]);
  };

  const handleUnCheck = (pk: number) => {
    setChecked((prevState) => prevState?.filter((n) => n !== pk));
  };

  return (
    <ScrollView>
      <Button
        onPress={() => setOpen(true)}
        style={style.Button}
        mode="contained-tonal"
      >
        add freinds
      </Button>
      <Portal>
        <Dialog visible={open} onDismiss={() => setOpen(false)}>
          <Dialog.Title>add friends</Dialog.Title>
          <Dialog.Content style={style.View}>
            {friendsList.length > 0 ? (
              friendsList.map((friend) => (
                <TouchableOpacity
                  onPress={() =>
                    includes(checked, friend.pkPlayer)
                      ? handleUnCheck(friend.pkPlayer)
                      : handleCheck(friend.pkPlayer)
                  }
                  style={{
                    ...style.ViewTicker,
                    borderBottomColor: includes(checked, friend.pkPlayer)
                      ? "rgb(0, 104, 123)"
                      : "black",
                    borderBottomWidth: includes(checked, friend.pkPlayer)
                      ? 4
                      : 0,
                  }}
                >
                  <View>
                    <Image source={Images.defaultImage} style={style.Image} />
                    <MyText> {friend.firstName + " " + friend.lastName}</MyText>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <MyText>there is no friends</MyText>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setValue(checked);
                setOpen(false);
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {checked.length > 0 && (
        <MyText> {checked.length} friend selected </MyText>
      )}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  Image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
  },
  View: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ViewTicker: {
    justifyContent: "center",
    margin: 10,
  },
  Button: {
    alignSelf: "center",
  },
});

type TProps = {
  friends: Friends;
  setValue: (values: unknown) => void;
  checkedList?: number[];
};

type Friends = Friend[];

type Friend = {
  firstName: string;
  lastName: string;
  pkPlayer: number;
  img?: string;
};
