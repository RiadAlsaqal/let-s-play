import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Login } from "./components";
import { MyText } from "@src/shared/components/Text";
import type { TNavigation } from "@src/shared/types";
import { withNavigation } from "@src/shared/HOC";
const ScreenLogIn: React.FC<TProps> = ({ navigation: { navigate } }) => {
  const theme = useTheme();
  return (
    <ScrollView>
      <View>
        <Login />
        <MyText style={{ textAlign: "center", marginTop: 20 }}>
          don't have an account?
          <MyText
            style={{
              textDecorationLine: "underline",
              color: theme.colors.primary,
            }}
            onPress={() => {
              navigate("SignUp" as never);
            }}
          >
            Signup here
          </MyText>
        </MyText>
      </View>
    </ScrollView>
  );
};

export const ScreenLogInWithNavigation = withNavigation(ScreenLogIn);

type TProps = {
  navigation: TNavigation;
};
