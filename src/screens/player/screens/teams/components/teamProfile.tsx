import React from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp, TRootStackTeamsScreenProps } from "@src/shared/types";
import { useQuery } from "@src/shared/hooks";
import { GET_TEAM_QUERY } from "../query";
import { withRoute } from "@src/shared/HOC";
import { Avatar } from "react-native-paper";
import { Images } from "../../../../../../assets/images";
import { MyText } from "@src/shared/components";

const TeamProfileWithoutRoute: React.FC<TProps> = ({ Route }) => {
  const { teamPk } = Route.params;
  const { data } = useQuery<TData>(GET_TEAM_QUERY, {
    variables: {
      id: teamPk,
    },
  });
  console.log("data", data);
  return (
    <View style={style.View}>
      <View style={style.imageNameView}>
        <Avatar.Image source={Images.defaultImage} />
        <MyText>{data?.myTeamById.data.edges[0].node.name}</MyText>
      </View>
    </View>
  );
};
export const TeamProfile = withRoute(TeamProfileWithoutRoute);
const style = StyleSheet.create({
  View: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageNameView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
  },
});

type TProps = {
  Route: RouteProp<TRootStackTeamsScreenProps, "teamProfle">;
};

type TData = {
  myTeamById: {
    data: {
      edges: {
        node: {
          name: string;
          memberCount: number;
          pkTeam: number;
          type_: {
            name: string;
          };
        };
      }[];
    };
  };
};