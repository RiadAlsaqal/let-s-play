import { tStatePlayer } from "./TStatePlayer";

export type TRootStackFriendsScreenProps = {
  Friends: undefined;
  players: undefined;
  findPlayerOnMap: {
    myLocation: TLocation;
  };
  playerProfile: {
    pk: number;
  };
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
