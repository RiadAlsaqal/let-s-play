import React from "react";
import { Button } from "@src/shared/components";
import { TNavigation, TRootStackTeamsScreenProps } from "@src/shared/types";
import { withNavigation } from "@src/shared/HOC";
const TeamsWithoutNavigation: React.FC<TProps> = ({ navigation }) => {
  return (
    <Button onPress={() => navigation.navigate("createTeam")}>
      create team
    </Button>
  );
};

export const Teams = withNavigation(TeamsWithoutNavigation);
type TProps = {
  navigation: TNavigation<TRootStackTeamsScreenProps>;
};
