import React from "react";
import { withRoute } from "@src/shared/HOC";
import { RouteProp, TRootStackReservationScreenProps } from "@src/shared/types";
import { ReservationList } from "../components";

const ReservationScreenPure: React.FC<TProps> = ({ Route }) => {
  const { team } = Route.params;
  return <ReservationList team={team} />;
};
export const ReservationScreen = withRoute(ReservationScreenPure);
type TProps = {
  Route: RouteProp<TRootStackReservationScreenProps, "myReservation">;
};
