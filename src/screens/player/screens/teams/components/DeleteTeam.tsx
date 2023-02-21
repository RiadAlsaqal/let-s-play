import React from "react";
import { useMutation } from "@src/shared/hooks";
import {
  TNavigation,
  TRootStackTeamsScreenProps,
  MD3Theme,
} from "@src/shared/types";
import { withNavigation, withTheme } from "@src/shared/HOC";
import { DELETE_TEAM_MUTATION } from "../query";
import { ButtonMutation } from "@src/shared/components";
import { useRefetchTeams } from "../hooks";
const DeleteTeamWithout: React.FC<TProps> = ({ navigation, theme, pk }) => {
  const { refetchTeams } = useRefetchTeams();
  const handleOnDelete = () => {
    refetchTeams();
    navigation.goBack();
  };
  return (
    <ButtonMutation
      query={{
        Mutation: DELETE_TEAM_MUTATION,
        Options: {
          variables: { pk },
          onCompleted: handleOnDelete,
        },
      }}
      buttonColor={theme.colors.error}
    >
      delete team
    </ButtonMutation>
  );
};
export const DeleteTeam = withNavigation(withTheme(DeleteTeamWithout));

type TProps = {
  navigation: TNavigation<TRootStackTeamsScreenProps>;
  theme: MD3Theme;
  pk: number;
};
