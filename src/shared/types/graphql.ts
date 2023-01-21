export type TResponse<T extends string, N extends string, D extends {}> = {
  data: {
    [key in T]: {
      data: {
        edges: {
          node: {
            [key in N]: D;
          };
        }[];
      };
    };
  };
};
