import { TGame } from "@src/shared/types";

export type TClube = {
  pkClub: number;
  name: string;
  locationLat: string;
  locationLong: string;
  isAvailable: boolean;
  numberStad: number;
};
export type TStadium = {
  name: string;
  isAvailable: boolean;
  hasLegua: boolean;
  size: number;
  pkStadium: number;
  type_: {
    name: TGame;
    pkType: number;
  };
};

type TGetClubById = {
  data: {
    edges: { node: TClube }[];
  };
  message: string;
  status: number;
};
export type TStadiumFilter = {
  stadiumFilter: {
    data: {
      edges: {
        node: TStadium;
      }[];
      status: number;
      message: string;
    };
  };
};
export type TDataAllClubs = {
  AllClub: {
    data: {
      edges: {
        node: TClube;
      }[];
    };
    status: number;
    message: string;
  };
};

export type TDataClub = {
  getClubById: TGetClubById;
} & TStadiumFilter;

export type TDuration = {
  node: {
    price: number;
    startTime: string;
    endTime: string;
    pkDuration: number;
    available: boolean;
  };
};

export type TDutationData = {
  avaliableDurationByStadium: {
    data: {
      edges: TDuration[];
    };
    status: number;
    message: string;
  };
};
