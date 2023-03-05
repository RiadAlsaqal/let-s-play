import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { TNotificationData, TChecKNoti, TNotificatio } from "../types";
import {
  GET_MY_NOTIFECATION_QUERY,
  READ_NOTIFECATION_MUTATION,
  CHECK_NOTI,
} from "./query";

const NotificationContext =
  React.createContext<TNotificationContext>(undefined);

export const NotificationProvider: React.FC<TProps> = ({ children }) => {
  const { data, refetch } = useQuery<TNotificationData>(
    GET_MY_NOTIFECATION_QUERY
  );
  const [checkNoti] = useLazyQuery<TChecKNoti>(CHECK_NOTI);
  const [readNoti] = useMutation(READ_NOTIFECATION_MUTATION);
  const newNotificationCount = data?.getNotification.countNotif;

  const defaultValue = {
    Notification: data?.getNotification.data.edges,
    readNotification: readNoti,
    newNotificationCount,
  };
  useEffect(() => {
    setInterval(() => {
      checkNoti().then(({ data }) => {
        if (data?.hasNotification.data) {
          refetch();
        }
      });
    }, 3 * 1000);
  }, []);
  return (
    <NotificationContext.Provider value={defaultValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNoti = () => {
  const noti = useContext(NotificationContext);
  return noti;
};

type TProps = {
  children: React.ReactElement;
};

type TNotificationContext =
  | {
      readNotification?: () => void;
      Notification?: TNotificatio[];
      newNotificationCount?: number;
    }
  | undefined;
