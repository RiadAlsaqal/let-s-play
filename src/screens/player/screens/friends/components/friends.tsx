import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SearchUsers, FriendsList } from "./index";
import { Button } from "@src/shared/components";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackFriendsScreenProps } from "@src/shared/types";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonInfo } from "./index";
import { useMyLocation } from "@src/shared/hooks";
const Friends: React.FC<TProps> = ({ navigation }) => {
  const { getMyLocatiopn } = useMyLocation();

  return (
    <ScrollView
      style={{
        marginBottom: 5,
      }}
    >
      <SearchUsers searchFriends={true}>
        {({ firstName, lastName, pk }) => (
          <ButtonInfo name={firstName + " " + lastName} pk={pk} />
        )}
      </SearchUsers>
      <Button
        mode="outlined"
        style={style.Button}
        onPress={() => navigation.navigate("players")}
        icon={() => <FontAwesome name="search" size={24} color="black" />}
      >
        search pepole
      </Button>
      <Button
        mode="outlined"
        style={style.Button}
        onPress={async () => {
          const myLocation = await getMyLocatiopn();
          if (Boolean(myLocation)) {
            navigation.navigate("findPlayerOnMap", {
              myLocation: myLocation as TLocation,
            });
          }
        }}
      >
        find player on map
      </Button>
      <FriendsList />
    </ScrollView>
  );
};

export const ScreenFriends = withNavigation(Friends);

const style = StyleSheet.create({
  Button: {
    margin: 5,
  },
});

type TProps = {
  navigation: TNavigation<TRootStackFriendsScreenProps>;
};
type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
