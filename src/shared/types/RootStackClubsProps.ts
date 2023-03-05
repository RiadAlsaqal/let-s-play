import { TClube } from "@src/screens/player/screens/clubs/types";
import { TLocation } from "./TLocation";
export type TRootStackClubsProps = {
  clubs: undefined;
  clubsMap: {
    data: { node: Omit<TClube, "name" | "isAvailable" | "numberStad"> }[];
  };
  clubProfile: {
    pk: number;
  };
  stadiumProfile: {
    pk: number;
  };
  reservation: undefined;
};
