import React from "react";
import { Logout, AvailabiltyOnTheMap, GoToUserProfile } from "./components";
export const ScreenSetting = () => {
  return (
    <>
      <GoToUserProfile />
      <AvailabiltyOnTheMap />
      <Logout />
    </>
  );
};

export { UserProfile } from "./components";
