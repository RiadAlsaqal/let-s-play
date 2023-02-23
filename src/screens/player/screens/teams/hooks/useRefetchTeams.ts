import { useNavigation } from "@react-navigation/native";
import { useClient } from "@src/shared/Apollo";

export const useRefetchTeams = () => {
  const client = useClient();
  const navigation = useNavigation();
  const refetchTeams = () => {
    client.refetchQueries({
      include: ["getMyTeams"],
    });
    navigation.goBack();
  };
  return { refetchTeams };
};
