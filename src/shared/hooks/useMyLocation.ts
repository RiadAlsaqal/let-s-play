import {
  useBackgroundPermissions,
  getCurrentPositionAsync,
} from "expo-location";
import { kMToLongitudes, kMToLatitudes } from "../utils";
export const useMyLocation = () => {
  const [status, requestPermission] = useBackgroundPermissions();

  const getPosition = async () => {
    try {
      let {
        coords: { latitude, longitude },
      } = await getCurrentPositionAsync();
      const data = {
        latitude,
        longitude,
        longitudeDelta: kMToLongitudes(0.1, latitude),
        latitudeDelta: kMToLatitudes(0.1),
      };
      return data;
    } catch (e) {}
  };
  const getMyLocatiopn = async () => {
    if (!status?.granted) {
      await requestPermission();

      return status?.granted ? await getPosition() : false;
    } else {
      return await getPosition();
    }
  };
  return { getMyLocatiopn, status: status?.granted };
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
