import React from "react";
import { ButtonMutation, MyText } from "@src/shared/components";
import { REJECT_FRIEND_MUTATION } from "../querys";
import { withTheme } from "@src/shared/HOC";
import { MD3Theme } from "@src/shared/types";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
const ButtonRejectFriendWithout: React.FC<TProps> = ({
  pk,
  refetch,
  theme,
  text,
  icon,
}) => {
  return (
    <ButtonMutation
      icon={icon ?? "trash-can"}
      buttonColor={theme.colors.error}
      query={{
        Mutation: REJECT_FRIEND_MUTATION,
        Options: { variables: { playerPk: pk }, onCompleted: refetch },
      }}
    >
      <MyText style={{ color: theme.colors.onPrimary }}>{text}</MyText>
    </ButtonMutation>
  );
};
export const ButtonRejectFriend = withTheme(ButtonRejectFriendWithout);

type TProps = {
  pk: number;
  refetch: () => void;
  theme: MD3Theme;
  text?: string;
  icon?: IconSource;
};
