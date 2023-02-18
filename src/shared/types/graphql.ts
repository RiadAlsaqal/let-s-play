export type TResponse<T extends string, N extends string, D extends {}> = {
  [key in T]: {
    data: {
      edges: {
        node: {
          state: "friend" | " accept" | " notFriend" | "pending";
          pkPlayer: number;
          userId: {
            firstName: string;
            lastName: string;
          };
        };
      }[];
    };
  };
};
