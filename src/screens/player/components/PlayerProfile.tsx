import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  RouteProp,
  TRootStackFriendsScreenProps,
  tStatePlayer,
} from "@src/shared/types";
import { withRoute } from "@src/shared/HOC";
import { MyText, Button } from "@src/shared/components";
import { useQuery } from "@src/shared/hooks";
import { Images } from "../../../../assets/images";
import { GET_PROFILE_QUERY } from "../queries";
import {
  ButtonAcceptFriend,
  ButtonAdd,
  ButtonCansel,
  ButtonRejectFriend,
} from "../screens/friends/components";
import { useClient } from "@src/shared/Apollo";

const mapStateToButton = (
  pk: number,
  state: tStatePlayer,
  refetch: () => void
) => {
  const config: Record<tStatePlayer, React.ReactElement> = {
    accept: (
      <>
        <ButtonRejectFriend pk={pk} refetch={refetch} text="reject" />
        <ButtonAcceptFriend pk={pk} refetch={refetch} />
      </>
    ),
    notFriend: <ButtonAdd pk={pk} refetch={refetch} />,
    pending: <ButtonCansel pk={pk} refetch={refetch} />,
    friend: (
      <ButtonRejectFriend pk={pk} refetch={refetch} text="delete friend" />
    ),
    self: <></>,
  };
  return config[state as keyof typeof config];
};
const User: React.FC<Tprops> = ({ Route }) => {
  const { pk } = Route.params;
  const { data } = useQuery<TData>(GET_PROFILE_QUERY, {
    variables: {
      playerId: pk,
    },
  });
  const client = useClient();
  const userData = data?.getPLayerById.data.edges[0].node;
  const handleRefetchFriends = () => {
    client.refetchQueries({ include: ["getAllFriends"] });
  };
  console.log("data", userData, pk);
  return (
    <View style={style.View}>
      <Image style={style.Image} source={Images.defaultImage} />
      <MyText>
        {userData?.userId.firstName} {userData?.userId.lastName}
      </MyText>
      <View style={style.ButtonView}>
        {mapStateToButton(
          pk,
          userData?.state as tStatePlayer,
          handleRefetchFriends
        )}
      </View>
    </View>
  );
};
export const playerProfile = withRoute(User);
const style = StyleSheet.create({
  View: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  ButtonView: {
    flexDirection: "row",
  },
});

type Tprops = {
  Route: RouteProp<TRootStackFriendsScreenProps, "playerProfile">;
};

type TData = {
  getPLayerById: {
    data: {
      edges: {
        node: {
          pkPlayer: number;
          state: tStatePlayer;
          userId: {
            firstName: string;
            lastName: string;
          };
        };
      }[];
    };
  };
};
