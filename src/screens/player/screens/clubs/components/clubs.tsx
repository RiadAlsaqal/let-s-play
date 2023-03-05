import React from "react";
import { View } from "react-native";
import { Button } from "@src/shared/components";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackClubsProps } from "@src/shared/types";
import { useQuery, useLazyQuery } from "@src/shared/hooks";
import { ClubCard, ArrowButton } from "../components";
import { GET_CLUBS } from "../query";
import { TClube, TDataAllClubs } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, IconButton } from "react-native-paper";
const Clubs: React.FC<TProps> = ({ navigation }) => {
  const { data } = useQuery<TDataAllClubs>(GET_CLUBS);
  const [getClubs] = useLazyQuery<TDataAllClubs>(GET_CLUBS);

  const clubsData = data?.AllClub.data.edges;
  return (
    <View>
      <Button
        onPress={() => {
          getClubs().then((data) => {
            navigation.navigate("clubsMap", {
              data: data.data?.AllClub.data.edges as { node: TClube }[],
            });
          });
        }}
      >
        find clubs on map
      </Button>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => {
          navigation.navigate("reservation");
        }}
      >
        make reservation
      </Button>
      <ScrollView style={{ marginTop: 10 }}>
        {clubsData?.map(
          ({
            node: {
              name,
              numberStad,
              pkClub,
              locationLat,
              locationLong,
              isAvailable,
            },
          }) => (
            <ClubCard name={name} numberStad={numberStad}>
              <>
                <IconButton
                  icon="map-marker-radius"
                  onPress={() => {
                    navigation.navigate("clubsMap", {
                      data: [{ node: { locationLat, locationLong, pkClub } }],
                    });
                  }}
                  size={40}
                />
                <ArrowButton
                  onPress={() => {
                    navigation.navigate("clubProfile", {
                      pk: pkClub,
                    });
                  }}
                />
              </>
            </ClubCard>
          )
        )}
        <Divider />
      </ScrollView>
    </View>
  );
};
export const ClubsScreen = withNavigation(Clubs);

type TProps = {
  navigation: TNavigation<TRootStackClubsProps>;
};
