import { DrawerHeaderProps } from "@react-navigation/drawer";
import { MyText } from "@src/shared/components";
import React from "react";
import { View } from "react-native";
import { useNoti } from "@src/shared/Notification";
import { Badge, IconButton } from "react-native-paper";

export const HeaderComponent: React.FC<TProps> = ({
  props: { navigation, options, layout, route },
}) => {
  const noti = useNoti();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "40%",
        }}
      >
        <IconButton
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <MyText variant="headlineSmall"> {route.name}</MyText>
      </View>
      <View>
        <Badge
          visible={!!noti?.newNotificationCount}
          style={{ position: "absolute", left: 28, top: 1 }}
        >
          {noti?.newNotificationCount}
        </Badge>

        <IconButton
          icon="bell"
          onPress={() => {
            navigation.navigate("notif");
          }}
        />
      </View>
    </View>
  );
};

type TProps = {
  props: DrawerHeaderProps;
};
