import { MyText } from "@src/shared/components";
import { TGame, TNotificatio } from "@src/shared/types";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Avatar, Surface } from "react-native-paper";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import { gamesImage } from "../../../../../../assets/gamesImage";
export const NotifecationCard: React.FC<TNotificatio> = ({
  node: {
    content,
    date,
    senderId: { username },
    senderKind,
    teamId,
    type,
  },
}) => {
  const time = moment(date).format("DD/MM/YYYY : h:mma");
  return (
    <View style={{ marginTop: 10 }}>
      <Surface elevation={5}>
        <View style={{ flexDirection: "row" }}>
          {teamId?.type_.name && (
            <Avatar.Image
              source={
                gamesImage[teamId?.type_.name as TGame] as AvatarImageSource
              }
            />
          )}
          <MyText variant="headlineMedium">{content}</MyText>
        </View>
        <MyText style={{ marginLeft: 10, color: "gray" }}>{time}</MyText>
      </Surface>
    </View>
  );
};

type TProps = {
  noti: TNotificatio;
};
