import { tStatePlayer } from "./TStatePlayer";

export type TResponse<T extends string, N extends string, D extends {}> = {
  [key in T]: {
    data: {
      edges: {
        node: {
          state: tStatePlayer;
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
