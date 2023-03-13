import React from "react";
import { Button } from "@src/shared/components";
import { TNavigation, TRootStackTeamsScreenProps } from "@src/shared/types";
import { withNavigation } from "@src/shared/HOC";
import { useQuery } from "@src/shared/hooks";
import { TeamCard } from "./index";
import { GET_MY_TEAMS_QUERY } from "../../../queries";
import { TMyAllTeam } from "../../../types";
import { Divider } from "react-native-paper";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
const TeamsWithoutNavigation: React.FC<TProps> = ({ navigation }) => {
  const { data, error, refetch } = useQuery<TMyAllTeam>(GET_MY_TEAMS_QUERY);
  const [refreshing, setRefreshing] = React.useState(false);
  const refresh = () => {
    refetch().then(() => {
      setRefreshing(false);
    });
    setRefreshing;
  };
  return (
    <>
      <Button
        onPress={() => navigation.navigate("createTeam")}
        mode="outlined"
        style={{ alignSelf: "center", borderRadius: 0, marginTop: 20 }}
      >
        create team
      </Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
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
      </ScrollView>
    </>
  );
};

export const Teams = withNavigation(TeamsWithoutNavigation);
type TProps = {
  navigation: TNavigation<TRootStackTeamsScreenProps>;
};
