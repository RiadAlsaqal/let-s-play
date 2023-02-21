import { tStatePlayer } from "./TStatePlayer";

export type TRootStackFriendsScreenProps = {
  Friends: undefined;
  players: undefined;
  findPlayerOnMap: {
    myLocation: TLocation;
  };
  playerProfile: {
    pk: number;
    name: string;
    img?: string;
    state: tStatePlayer;
  };
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
