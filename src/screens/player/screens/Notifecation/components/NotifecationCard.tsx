import { MyText } from "@src/shared/components";
import { TGame, TNotificatio } from "@src/shared/types";
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
    teamId: {
      name,
      type_: { name: gameName, pkType },
    },
    type,
  },
}) => {
  return (
    <View>
      <Surface>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image
            source={gamesImage[gameName as TGame] as AvatarImageSource}
          />
          <MyText>{content}</MyText>
        </View>
        <MyText>{date}</MyText>
      </Surface>
    </View>
  );
};

type TProps = {
  noti: TNotificatio;
};
