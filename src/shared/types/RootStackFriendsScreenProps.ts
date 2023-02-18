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
  };
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
