import React from "react";
import { Button } from "@src/shared/components";
import { TNavigation, TRootStackTeamsScreenProps } from "@src/shared/types";
import { withNavigation } from "@src/shared/HOC";
import { useQuery } from "@src/shared/hooks";
import { TeamCard } from "./index";
import { GET_MY_TEAMS_QUERY } from "../query";
import { Divider } from "react-native-paper";
const TeamsWithoutNavigation: React.FC<TProps> = ({ navigation }) => {
  const { data, error } = useQuery<TData>(GET_MY_TEAMS_QUERY);
  return (
    <>
      <Button
        onPress={() => navigation.navigate("createTeam")}
        mode="outlined"
        style={{ alignSelf: "center", borderRadius: 0 }}
      >
        create team
      </Button>

      {data?.myAllTeam?.data?.edges.map(
        ({
          node: {
            name,
            pkTeam,
            type_: { name: typeName },
          },
        }) => (
          <>
            <TeamCard
              data={{
                name: name,
                teamPk: pkTeam,
                typeName: typeName,
              }}
            />
            <Divider />
          </>
        )
      )}
    </>
  );
};

export const Teams = withNavigation(TeamsWithoutNavigation);
type TProps = {
  navigation: TNavigation<TRootStackTeamsScreenProps>;
};

type TData = {
  myAllTeam: {
    data: {
      edges: {
        node: {
          name: string;
          pkTeam: number;
          type_: {
            name: string;
          };
        };
      }[];
    };
  };
};
