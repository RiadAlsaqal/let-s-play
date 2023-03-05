export type TNotificationData = {
  getNotification: {
    data: {
      edges: TNotificatio[];
    };
    countNotif: number;
    message: string;
    status: number;
  };
};

export type TNotificatio = {
  node: {
    senderId: {
      username: string;
    };
    teamId: {
      name: string;
      type_: {
        name: string;
        pkType: number;
      };
    };
    senderKind: string;
    type: string;
    content: string;
    date: string;
  };
};

export type TChecKNoti = {
  hasNotification: {
    data: boolean;
    message: string;
    status: number;
  };
};
