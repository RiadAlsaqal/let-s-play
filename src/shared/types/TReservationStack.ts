import { TClube } from "@src/screens/player/screens/clubs/types";
import { TReservation } from "@src/screens/player/screens/Reservation/types";

export type TSTackReservation = {
  ReservationProfle: {
    data: TReservation;
  };
  reservation: {
    team: boolean;
  };
  clubsMap: {
    data: { node: Omit<TClube, "name" | "isAvailable" | "numberStad"> }[];
  };
};
