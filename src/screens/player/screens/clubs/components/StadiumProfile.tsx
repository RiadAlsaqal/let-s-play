import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";
import { IconButton } from "react-native-paper";

import { Button, MyText } from "@src/shared/components";
import { useLazyQuery, useMutation, useQuery } from "@src/shared/hooks";
import { withRoute, withTheme, withNavigation } from "@src/shared/HOC";
import {
  MD3Theme,
  RouteProp,
  TRootStackClubsProps,
  TNavigation,
} from "@src/shared/types";
import { TMyAllTeam, TTeam } from "@src/screens/player/types";
import { GET_MY_TEAMS_QUERY } from "@src/screens/player/queries";
import { ChooseActor } from "../components";
import {
  GET_STADIUME,
  GET_AVAILABLE_DURATION_FOR_STADIUM,
  RESERVATE_MUTATION,
} from "../query";
import { TDutationData, TStadiumFilter, TDuration } from "../types";
import { StadiumCard, ReservationTable, ChooseDate } from "../components";
import { addMothsToCurrentDate, reComposeDate } from "../utils";
import { flowRight } from "lodash";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const StadiumProfilePure: React.FC<TProps> = ({ Route, theme, navigation }) => {
  const { pk } = Route.params;
  const ref = React.useRef<Swiper>();
  const [date, setDate] = React.useState<Date>(new Date());
  const [openDataTable, setOpenDataTable] = React.useState<boolean>(false);
  const [selectedDuration, setselectedDuration] = React.useState<TDuration>();
  const [error, setError] = React.useState<string>();
  const [order, setOrder] = React.useState(0);
  const [actor, setActor] = React.useState<number | null>();
  const { data } = useQuery<TStadiumFilter>(GET_STADIUME, {
    variables: {
      id: pk,
    },
  });
  const [getMyTeams, { data: teamsData }] = useLazyQuery<TMyAllTeam>(
    GET_MY_TEAMS_QUERY,
    { fetchPolicy: "no-cache" }
  );

  const [getDuration, { data: DurationData, refetch }] =
    useLazyQuery<TDutationData>(GET_AVAILABLE_DURATION_FOR_STADIUM);
  const [reservate] = useMutation(RESERVATE_MUTATION);

  const duration = DurationData?.avaliableDurationByStadium.data.edges;
  const stadiumData = data?.stadiumFilter.data.edges[0].node;
  const teamData = teamsData?.myAllTeam.data.edges;
  const handleClearError = () => {
    setError(undefined);
  };
  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && date) {
      getDuration({
        variables: {
          stadiumId: pk,
          date: reComposeDate(date),
        },
      })
        .then(() => {
          setOpenDataTable(true);
        })
        .catch(() => {
          setOpenDataTable(false);
        });
      date && setDate(date);
    }
  };
  const handleActor = (pk: number | null) => {
    setActor(pk);
  };
  const handleSelecteDuration = (DurationPk: TDuration) => {
    setselectedDuration(DurationPk);
  };
  const handleReservate = () => {
    reservate({
      variables: {
        durationId: selectedDuration?.node.pkDuration,
        date: reComposeDate(date),
        kind: actor === null ? "player" : "team",
        teamId: actor,
      },
    }).then(() => {
      navigation.goBack();
    });
  };
  const paginationFunction = (order: number) => {
    const config: Record<number, () => void> = {
      0: () => {
        if (openDataTable) {
          setOrder(1);
          ref.current?.scrollTo(1);
          handleClearError();
        } else {
          setError("choose date first!!");
        }
      },
      1: () => {
        if (selectedDuration) {
          setOrder(2);
          getMyTeams({
            variables: {
              onlyCaptin: true,
            },
          }).then(() => {
            ref.current?.scrollTo(2);
          });
          handleClearError();
        } else {
          setError("choose time!! ");
        }
      },
      2: () => {
        if (actor || actor === null) {
          console.log("actor", actor);
          setOrder(3);
          ref.current?.scrollTo(3);
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
      {stadiumData?.pkStadium && (
        <StadiumCard
          data={stadiumData}
          styleView={{ backgroundColor: theme.colors.surfaceVariant }}
        />
      )}
      <MyText style={style.text}>{error}</MyText>
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
          <ChooseDate
            date={date}
            onChange={handleChangeDate}
            showDate={openDataTable}
          />
        </View>
        <View style={style.slider}>
          {openDataTable && duration && duration?.length > 0 && (
            <>
              <ReservationTable
                data={duration}
                setValue={handleSelecteDuration}
              />
            </>
          )}
        </View>
        <View style={style.slider}>
          <ChooseActor setActor={handleActor} teamData={teamData as TTeam[]} />
        </View>
        <View style={style.slider}>
          <Button onPress={handleReservate}>reservate</Button>
        </View>
      </Swiper>
    </View>
  );
};

export const StadiumProfile = flowRight(
  withTheme,
  withRoute,
  withNavigation
)(StadiumProfilePure);

type TProps = {
  Route: RouteProp<TRootStackClubsProps, "stadiumProfile">;
  theme: MD3Theme;
  navigation: TNavigation<TRootStackClubsProps>;
};

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
