import React from "react";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackSettingsScreenProps } from "@src/shared/types";
import { Button } from "@src/shared/components";
const GoToUserProfilePure: React.FC<TProps> = ({ navigation }) => {
  const handleOnPress = () => {
    navigation.navigate("UserProfile");
  };
  return (
    <Button icon="account" mode="text" onPress={handleOnPress}>
      profile
    </Button>
  );
};
export const GoToUserProfile = withNavigation(GoToUserProfilePure);
type TProps = {
  navigation: TNavigation<TRootStackSettingsScreenProps>;
};
