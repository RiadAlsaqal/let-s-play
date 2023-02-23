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
import { TButtonProps } from "@src/shared/components";
const DeleteTeamWithout: React.FC<TProps> = ({
  navigation,
  theme,
  pk,
  ...props
}) => {
  const { refetchTeams } = useRefetchTeams();

  return (
    <ButtonMutation
      {...props}
      icon="trash-can"
      query={{
        Mutation: DELETE_TEAM_MUTATION,
        Options: {
          variables: { pk },
          onCompleted: refetchTeams,
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
} & Omit<TButtonProps, "theme" | "children">;
