import { tStatePlayer } from "./TStatePlayer";

export type TRootStackTeamsScreenProps = {
  teams: undefined;
  createTeam: undefined;
  teamProfle: {
    teamPk: number;
  };
  playerProfile: {
    pk: number;
    name: string;
    img?: string;
    state: tStatePlayer;
  };
};
