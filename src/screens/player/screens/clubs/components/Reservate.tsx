import React from "react";
import Swiper from "react-native-swiper";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { GET_MY_TEAMS_QUERY } from "@src/screens/player/queries";
import { TMyAllTeam, TTeam } from "@src/screens/player/types";
import { Button, MyText } from "@src/shared/components";
import { useLazyQuery, useMutation } from "@src/shared/hooks";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackClubsProps } from "@src/shared/types";
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, IconButton } from "react-native-paper";
import {
  ChooseTypeOfGame,
  ChooseDate,
  StadiumCard,
  ReservationTable,
  ChooseActor,
} from "../components";
import {
  GET_STADIUM_FOR_RESERVATE_QUERY,
  GET_AVAILABLE_DURATION_FOR_STADIUM,
  RESERVATE_MUTATION,
} from "../query";
import { TDutationData, TDuration } from "../types";
import { reComposeDate } from "../utils";

const ReservatePure: React.FC<TProps> = ({ navigation }) => {
  const ref = React.useRef<Swiper>();
  const [order, setOrder] = React.useState(0);
  const [error, setError] = React.useState<string>();
  const [gameType, setGameType] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [didSelectedDate, setDidSelectedDate] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<TDuration>();
  const [actor, setActor] = React.useState<number | null>();
  const [selectedStadium, setSelectedStadium] = React.useState<number>();
  const [getStadiums, { data: stadiums }] = useLazyQuery<TStadiumData>(
    GET_STADIUM_FOR_RESERVATE_QUERY
  );
  const [getDurations, { data: durations }] = useLazyQuery<TDutationData>(
    GET_AVAILABLE_DURATION_FOR_STADIUM
  );
  const [getMyTeams, { data: teamsData }] = useLazyQuery<TMyAllTeam>(
    GET_MY_TEAMS_QUERY,
    { fetchPolicy: "no-cache" }
  );
  const [reservate] = useMutation(RESERVATE_MUTATION);

  const handleClearError = () => {
    setError(undefined);
  };
  const stadiumsData = stadiums?.stadiumFilter.data.edges;
  const durationsData = durations?.avaliableDurationByStadium.data.edges;
  const teamData = teamsData?.myAllTeam.data.edges;

  const handleSetDuration = (duration: TDuration) => {
    setDuration(duration);
  };
  const handleSetActor = (actor: number | null) => {
    setActor(actor);
  };
  const handleChangeDate = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    if (event.type === "set") {
      setDate(date as Date);
      setDidSelectedDate(true);
    }
  };
  const handleSelecteStad = (pk: number) => {
    setSelectedStadium(pk);
  };
  const handleReservate = () => {
    reservate({
      variables: {
        durationId: duration?.node.pkDuration,
        date: reComposeDate(date),
        kind: actor === null ? "player" : "team",
        teamId: actor,
      },
    }).then((e) => {
      e.data.status < 300 && navigation.goBack();
    });
  };
  const paginationFunction = (order: number) => {
    const config: Record<number, () => void> = {
      0: () => {
        if (gameType) {
          setOrder(1);
          ref.current?.scrollTo(1);
          handleClearError();
        } else {
          setError("choose game!!");
        }
      },
      1: () => {
        if (didSelectedDate) {
          setOrder(2);
          getStadiums({
            variables: {
              typeId: Number(gameType),
              date: reComposeDate(date),
            },
          }).then(() => {
            ref.current?.scrollTo(2);
          });
          handleClearError();
        } else {
          setError("choose date!! ");
        }
      },
      2: () => {
        if (selectedStadium) {
          getDurations({
            variables: {
              stadiumId: selectedStadium,
              date: reComposeDate(date),
            },
          });
          setOrder(3);
          ref.current?.scrollTo(3);
          handleClearError();
        } else {
          setError("choose stadium");
        }
      },
      3: () => {
        if (duration) {
          getMyTeams({
            variables: {
              onlyCaptin: true,
            },
          });
          setOrder(4);
          ref.current?.scrollTo(4);
          handleClearError();
        } else {
          setError("choose time");
        }
      },
      4: () => {
        if (actor || actor === null) {
          setOrder(5);
          ref.current?.scrollTo(5);
          handleClearError();
        } else {
          setError("choose actor");
        }
      },
    };
    return config[order]();
  };
  return (
    <View style={style.View}>
      <MyText style={{ color: "red" }} variant="bodyLarge">
        {error}
      </MyText>
      <Swiper
        ref={ref as any}
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        showsButtons={true}
        scrollEnabled={false}
        loop={false}
        nextButton={
          <IconButton
            onPress={() => {
              paginationFunction(order);
            }}
            icon="arrow-right"
          />
        }
        prevButton={
          <IconButton
            onPress={() => {
              setOrder(order - 1);
              ref.current?.scrollTo?.(order - 1);
            }}
            icon="arrow-left"
          />
        }
      >
        <View style={style.slider}>
          <ChooseTypeOfGame
            state={{ setValue: setGameType, value: gameType }}
          />
        </View>
        <View style={style.slider}>
          <ChooseDate
            date={date}
            onChange={handleChangeDate}
            showDate={didSelectedDate}
          />
        </View>
        <View style={style.slider}>
          <ScrollView>
            {stadiumsData?.map(({ node }) => (
              <StadiumCard data={node as any}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    icon="map-marker-radius"
                    onPress={() => {
                      console.log("wwww", node);
                      navigation.navigate("clubsMap", {
                        data: [
                          {
                            node: {
                              locationLat: node.section.clubId.locationLat,
                              locationLong: node.section.clubId.locationLong,
                              pkClub: node.section.clubId.pkClub,
                            },
                          },
                        ],
                      });
                    }}
                    size={40}
                  />
                  <Checkbox
                    status={
                      selectedStadium === node.pkStadium
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleSelecteStad(node.pkStadium)}
                  />
                </View>
              </StadiumCard>
            ))}
          </ScrollView>
        </View>
        <View style={style.slider}>
          <>
            <ReservationTable
              data={durationsData as TDuration[]}
              setValue={handleSetDuration}
            />
          </>
        </View>
        <View style={style.slider}>
          <ChooseActor
            setActor={handleSetActor}
            teamData={teamData as TTeam[]}
          />
        </View>
        <View style={style.slider}>
          <Button onPress={handleReservate}>reservate</Button>
        </View>
      </Swiper>
    </View>
  );
};

export const Reservate = withNavigation(ReservatePure);

const style = StyleSheet.create({
  View: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  slider: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "red",
  },
});

type TProps = {
  navigation: TNavigation<TRootStackClubsProps>;
};

type TStadiumData = {
  stadiumFilter: {
    data: {
      edges: TStadium[];
    };
    message: string;
    status: number;
  };
};

type TStadium = {
  node: {
    name: string;
    isAvailable: boolean;
    hasLegua: boolean;
    size: number;
    pkStadium: number;
    type_: {
      name: string;
      pkType: number;
    };
    section: {
      clubId: {
        name: string;
        locationLat: string;
        locationLong: string;
        pkClub: number;
      };
    };
  };
};
