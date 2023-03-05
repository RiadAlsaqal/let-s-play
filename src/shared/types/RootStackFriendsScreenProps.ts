import { tStatePlayer } from "./TStatePlayer";
import { TLocation } from "./TLocation";
export type TRootStackFriendsScreenProps = {
  Friends: undefined;
  players: undefined;
  findPlayerOnMap: {
    myLocation: TLocation;
  };
  playerProfile: {
    pk: number;
  };
  friendsRequest: undefined;
};
