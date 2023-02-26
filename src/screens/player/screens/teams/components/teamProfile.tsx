import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  RouteProp,
  TRootStackTeamsScreenProps,
  TNavigation,
  tStatePlayer,
  MD3Theme,
} from "@src/shared/types";
import { useQuery, useLazyQuery, useMutation } from "@src/shared/hooks";
import { withRoute, withNavigation, withTheme } from "@src/shared/HOC";
import { useAuth } from "@src/shared/Auth";
import { Button, MyText } from "@src/shared/components";
import { Avatar, IconButton } from "react-native-paper";
import {
  GET_TEAM_QUERY,
  GET_MEMBERS_OF_TEAM_QUERY,
  GET_FRIENDS_CAN_ADD_TO_TEAM,
  ADD_MEMBERS_TO_TEAM_MUTATION,
  REMOVE_MEMBER_MUTATION,
} from "../query";
import { Images } from "../../../../../../assets/images";
import { PlayerCard } from "../../../components";
import {
  DeleteTeam,
  LeaveTeamButton,
  SelectFriends,
  LongPressDialog,
} from "./index";
import { extractFriendsFromQuery } from "../utils";
import { flowRight } from "lodash";
const TeamProfileWithoutRoute: React.FC<TProps> = ({
  Route,
  navigation,
  theme,
}) => {
  const { teamPk } = Route.params;
  const [memberToRemove, setMemberToRemove] = React.useState<number[]>();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { user } = useAuth();
  const { data } = useQuery<TDataTeam>(GET_TEAM_QUERY, {
    variables: {
      id: teamPk,
    },
  });
  const [getFriendsCanAddToTeam, { data: friendsCanAddToTeam }] =
    useLazyQuery<TDataFriendsCanAdd>(GET_FRIENDS_CAN_ADD_TO_TEAM, {
      defaultOptions: {
        fetchPolicy: "no-cache",
      },
    });
  const [addMembers] = useMutation(ADD_MEMBERS_TO_TEAM_MUTATION);
  const teamData = data?.myTeamById?.data?.edges[0]?.node;
  const { data: members, refetch } = useQuery<TDataMembers>(
    GET_MEMBERS_OF_TEAM_QUERY,
    {
      variables: {
        id: teamPk,
      },
    }
  );
  const handleOnLongPress = (memberToDelete: number) => {
    if (!isMe(memberToDelete)) {
      setMemberToRemove([memberToDelete]);
      setOpenDialog(true);
    }
  };
  const handelOnDismiss = () => {
    setOpenDialog(false);
    setMemberToRemove(undefined);
  };
  const [deleteMember] = useMutation(REMOVE_MEMBER_MUTATION);
  const isCaptin = ((member: typeof members) => {
    const theCaptin = member?.memmberTeamById.data.edges.filter(
      (e) => e.node?.isCaptin
    );

    return user?.user?.pk === theCaptin?.[0].node?.member?.pkPlayer;
  })(members);
  const isMe = (pk: number) => {
    return pk === user?.user?.pk;
  };
  return !!teamData ? (
    <View style={style.View}>
      <View style={style.imageNameView}>
        <Avatar.Image source={Images.defaultImage} style={{ margin: 10 }} />
        <View>
          <MyText>{teamData?.name}</MyText>

          <MyText variant="labelSmall">
            {teamData?.memberCount + "members"}
          </MyText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {isCaptin === false ? (
          <LeaveTeamButton teamPk={teamPk} />
        ) : (
          <DeleteTeam pk={teamPk} style={{ alignSelf: "center" }} />
        )}
        <SelectFriends
          friends={extractFriendsFromQuery(
            friendsCanAddToTeam?.getFriendCanAddToTeam?.data
          )}
          onDone={(checked) => {
            addMembers({
              variables: {
                members: checked,
                teamPk,
              },
            }).then(() => {
              refetch();
            });
          }}
          onOpen={() =>
            getFriendsCanAddToTeam({
              variables: {
                teamId: teamData.pkTeam,
              },
            })
          }
        />
      </View>
      <MyText style={{ alignSelf: "flex-start" }} variant="headlineLarge">
        members:
      </MyText>
      <ScrollView style={style.ScrollView}>
        {members?.memmberTeamById?.data?.edges?.map(
          ({
            node: {
              isCaptin,
              member: {
                pkPlayer,
                state,
                userId: { firstName, lastName },
              },
            },
          }) => (
            <PlayerCard
              data={{ firstName, lastName, pk: pkPlayer }}
              onLongPress={() => handleOnLongPress(pkPlayer)}
            >
              {isCaptin && <MyText> Captin</MyText>}

              {user?.user?.pk !== pkPlayer && (
                <IconButton
                  icon="arrow-right"
                  onPress={() =>
                    navigation.navigate("playerProfile", {
                      pk: pkPlayer,
                    })
                  }
                />
              )}
            </PlayerCard>
          )
        )}
      </ScrollView>
      {isCaptin && (
        <LongPressDialog open={openDialog} onDismiss={handelOnDismiss}>
          <Button
            style={{
              borderRadius: 0,
              width: "100%",
            }}
            icon="trash-can"
            buttonColor="inherit"
            textColor={theme.colors.error}
            onPress={() => {
              deleteMember({
                variables: {
                  members: memberToRemove,
                  teamPk,
                },
                onCompleted: () => {
                  refetch();
                  handelOnDismiss();
                },
              });
            }}
            children="delete member"
          />
        </LongPressDialog>
      )}
    </View>
  ) : (
    <></>
  );
};
export const TeamProfile = flowRight(
  withNavigation,
  withRoute,
  withTheme
)(TeamProfileWithoutRoute);
const style = StyleSheet.create({
  View: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  imageNameView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  ScrollView: {
    width: "100%",
  },
});

type TProps = {
  Route: RouteProp<TRootStackTeamsScreenProps, "teamProfle">;
  navigation: TNavigation<TRootStackTeamsScreenProps>;
  theme: MD3Theme;
};

type TDataTeam = {
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
type TDataMembers = {
  memmberTeamById: {
    data: {
      edges: [
        {
          node: {
            isCaptin: boolean;
            member: {
              pkPlayer: number;
              state: tStatePlayer;
              userId: {
                firstName: string;
                lastName: string;
              };
            };
          };
        }
      ];
    };
  };
};

type TDataFriendsCanAdd = {
  getFriendCanAddToTeam: {
    data: {
      edges: {
        node: {
          friends: {
            pkPlayer: number;
            userId: {
              firstName: string;
              lastName: string;
            };
          };
        };
      }[];
    };
    status: number;
    message: string;
  };
};
