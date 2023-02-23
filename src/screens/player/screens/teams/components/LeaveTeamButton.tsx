import React from "react";
import { ButtonMutation } from "@src/shared/components";
import { LEAVE_TEAM_MUTATION } from "../query";
import { useRefetchTeams } from "../hooks";
import { MD3Theme } from "@src/shared/types";
import { withTheme } from "@src/shared/HOC";
export const LeaveTeamButtonWithoutTheme: React.FC<TProps> = ({
  teamPk,
  theme,
}) => {
  const { refetchTeams } = useRefetchTeams();
  return (
    <ButtonMutation
      buttonColor={theme.colors.error}
      query={{
        Mutation: LEAVE_TEAM_MUTATION,
        Options: {
          variables: {
            teamPk,
          },
          onCompleted: refetchTeams,
        },
      }}
    >
      leave team
    </ButtonMutation>
  );
};

export const LeaveTeamButton = withTheme(LeaveTeamButtonWithoutTheme);
type TProps = {
  teamPk: number;
  theme: MD3Theme;
};
