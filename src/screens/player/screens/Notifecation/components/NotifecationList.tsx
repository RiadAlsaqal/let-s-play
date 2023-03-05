import React from "react";
import { View } from "react-native";
import { useNoti } from "@src/shared/Notification";
import { NotifecationCard } from "../components";
export const NotifecationList = () => {
  const noti = useNoti();
  console.log("dataa", noti);
  return (
    <View>
      {noti?.Notification?.map(({ node }) => (
        <NotifecationCard node={node} />
      ))}
    </View>
  );
};
