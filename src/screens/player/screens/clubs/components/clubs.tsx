import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "@src/shared/components";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackClubsProps } from "@src/shared/types";
import { useQuery, useLazyQuery } from "@src/shared/hooks";
import { ClubCard, ArrowButton } from "../components";
import { GET_CLUBS } from "../query";
import { TClube, TDataAllClubs } from "../types";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Divider, IconButton } from "react-native-paper";
const Clubs: React.FC<TProps> = ({ navigation }) => {
  const { data, refetch } = useQuery<TDataAllClubs>(GET_CLUBS);
  const [getClubs] = useLazyQuery<TDataAllClubs>(GET_CLUBS);
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = () => {
    refetch().then(() => {
      setRefreshing(false);
    });
    setRefreshing;
  };
  const clubsData = data?.AllClub.data.edges;
  useEffect(() => {
    refetch();
  });
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
      <View>
        <SafeAreaView>
          <ScrollView
            style={{ marginTop: 10, marginBottom: 200 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          >
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
                          data: [
                            { node: { locationLat, locationLong, pkClub } },
                          ],
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
        </SafeAreaView>
      </View>
    </View>
  );
};
export const ClubsScreen = withNavigation(Clubs);

type TProps = {
  navigation: TNavigation<TRootStackClubsProps>;
};
