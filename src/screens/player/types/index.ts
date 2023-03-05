export type TTeam = {
  node: {
    name: string;
    pkTeam: number;
    type_: {
      name: string;
    };
  };
};

export type TMyAllTeam = {
  myAllTeam: {
    data: {
      edges: TTeam[];
    };
  };
};
