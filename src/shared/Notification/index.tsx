import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useAuth } from "../Auth";
import { TNotificationData, TChecKNoti, TNotificatio } from "../types";
import {
  GET_MY_NOTIFECATION_QUERY,
  READ_NOTIFECATION_MUTATION,
  CHECK_NOTI,
} from "./query";

const NotificationContext =
  React.createContext<TNotificationContext>(undefined);

export const NotificationProvider: React.FC<TProps> = ({ children }) => {
  const auth = useAuth();
  const { data, refetch } = useQuery<TNotificationData>(
    GET_MY_NOTIFECATION_QUERY
  );
  const [checkNoti] = useLazyQuery<TChecKNoti>(CHECK_NOTI);
  const [readNoti] = useMutation<TM>(READ_NOTIFECATION_MUTATION);
  let newNotificationCount = data?.getNotification.countNotif;
  const readNotifiecation = () => {
    readNoti().then((e) => {
      if (e.data?.readNotification) {
        newNotificationCount = 0;
      }
    });
  };
  let countFriend = 0;
  let countTeam = 0;
  const numberFriend = () => {
    newNotificationCount &&
      newNotificationCount > 0 &&
      data?.getNotification.data.edges?.map(({ node: { type } }) => {
        if (type === "ACCEPT_FIEND" || type === "REQUEST_FRIEND") {
          countFriend += 1;
        }
      });
  };

  const numberTeam = () => {
    newNotificationCount &&
      newNotificationCount > 0 &&
      data?.getNotification.data.edges?.map(({ node: { type } }) => {
        if (type === "GROUP_MESSAGE") {
          countTeam += 1;
        }
      });
  };

  const defaultValue: TNotificationContext = {
    Notification: data?.getNotification.data.edges,
    readNotification: readNoti,
    newNotificationCount,
    friendsCount: countFriend,
    teamCount: countTeam,
  };
  useEffect(() => {
    setInterval(() => {
      auth.Auth === true &&
        checkNoti().then(({ data }) => {
          if (data?.hasNotification.data) {
            refetch().then(() => {
              numberTeam();
              numberFriend();
            });
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
      friendsCount?: number;
      teamCount?: number;
    }
  | undefined;

type TM = {
  readNotification: {
    message: string;
    status: number;
  };
};
