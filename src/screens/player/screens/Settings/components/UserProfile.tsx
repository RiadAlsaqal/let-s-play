import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { Avatar, Divider, Surface } from "react-native-paper";
import { useAuth } from "@src/shared/Auth";
import { Images } from "../../../../../../assets/images";
import { MyText } from "@src/shared/components";

export const UserProfile = () => {
  const { user: data } = useAuth();
  const user = data?.user;
  console.log("user", user);
  return (
    <View style={style.View}>
      {user?.pk && (
        <Surface elevation={3}>
          <View style={style.userView}>
            <Avatar.Image
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAxCAYAAAB5wO9OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAILSURBVGhD7drPK8NxHMfxF3KQUqIcEf+BOycH7nIh5SAXN5EoSRIlRXEQJ0r5UZQiDoahJEWU35tozPS1zMzMj413SfvxXmmfz/fwflx8Xsc9277f75akzyCIqJLpr4hCAjEkEEMCMSQQQwIxJBBDAjEkEEMCMSQQQwIxTBdoeNuNjuUHWvqZ6tt844IL/evG97mpJBPdZdnfZ51ME8gX+ER62xmtH76uQqSmJNHSwzQfsdKRazr9qpq8pZM+pgi0euHFpt1H69f0gQfH935aepgiUO3UHZ2AnvJsjFXk0AKqNb+LtAfqtRiwGwFawQt1cSZqijJoAbs3r1g8fqalnvZAnSv8LV3ntUhroLoZJ7xv/E3UePnA0JabllraAh3d+TG6E/+LbphzwvH0TksdbYFal1x0il/f2s9DpEpaAk3tezB/FPnCWznhQP2sk9Zfoadsa4THgUTSEmhw85FO4bavfFg+9dIKp/pdpDzQ0NYjrLYXWuHsLfk4b86jFW7u0IPxvSdaiac0UOhuNGj9/90o9C7y+D9oJZbSQAMbBk5csb865HZfoqDHRiuyfccr+oIPmCpouQbFcu0OwGa80dJP+c8doR/DLJfRr0HxKMlPQ3tpFq3Ekn9/YZjuI2Y2EoghgRgSiCGBGBKIIYEYEoghgRgSiCGBGBKIIYEYEoghgRgSiCGBYgK+AMR0p9+0ht2OAAAAAElFTkSuQmCC",
              }}
              style={{ marginRight: 30, marginLeft: 30 }}
            />
            <Divider />
            <View>
              <MyText variant="headlineLarge">
                {user.firstName} {user.lastName}
              </MyText>
              <MyText variant="labelSmall">username: {user.username}</MyText>
              <MyText variant="labelSmall">email: {user.email}</MyText>
            </View>
          </View>
        </Surface>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    marginTop: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  userView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    width: "100%",
  },
});
