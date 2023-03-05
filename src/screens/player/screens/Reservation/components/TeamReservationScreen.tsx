import React from "react";

import { ReservationList } from "../components";

export const TeamReservationScreen: React.FC<TProps> = ({}) => {
  return <ReservationList team={true} />;
};
type TProps = {};
