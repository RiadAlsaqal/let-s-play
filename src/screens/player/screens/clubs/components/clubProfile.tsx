import React from "react";
import { View } from "react-native";
import { useQuery } from "@src/shared/hooks";
import {
  RouteProp,
  TRootStackClubsProps,
  TNavigation,
} from "@src/shared/types";
import { withRoute, withNavigation } from "@src/shared/HOC";
import { ClubCard } from "./ClubCard";
import { GET_CLUB } from "../query";
import { TDataClub } from "../types";
import { ArrowButton } from "./index";
import { MyText } from "@src/shared/components";
import { StadiumCard } from "./StadiumCard";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { flowRight } from "lodash";
const ClubProfilePure: React.FC<TProps> = ({ Route, navigation }) => {
  const { pk } = Route.params;
  const { data } = useQuery<TDataClub>(GET_CLUB, {
    variables: {
      id: pk,
    },
  });

  const ClubData = data?.getClubById.data.edges?.[0].node;
  const StadumsData = data?.stadiumFilter.data.edges;
  return (
    <View>
      <ClubCard
        name={ClubData?.name as string}
        numberStad={ClubData?.numberStad as number}
      />
      <MyText variant="headlineMedium"> stadiums :</MyText>

      {StadumsData && StadumsData?.length > 0 ? (
        <ScrollView>
          {StadumsData?.map(({ node }) => (
            <>
              <StadiumCard data={node}>
                <ArrowButton
                  onPress={() => {
                    navigation.navigate("stadiumProfile", {
                      pk: node.pkStadium,
                    });
                  }}
                />
              </StadiumCard>
              <Divider />
            </>
          ))}
        </ScrollView>
      ) : (
        <MyText> there is no stadiums at this moment</MyText>
      )}
    </View>
  );
};

export const ClubProfile = flowRight(
  withNavigation,
  withRoute
)(ClubProfilePure);

type TProps = {
  Route: RouteProp<TRootStackClubsProps, "clubProfile">;
  navigation: TNavigation<TRootStackClubsProps>;
};
