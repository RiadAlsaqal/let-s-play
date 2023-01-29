import {
  useBackgroundPermissions,
  getCurrentPositionAsync,
} from "expo-location";

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

function radiansToDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

function degreesToRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function latitudesToKM(latitudes: number) {
  return latitudes * 110.574;
}

function kMToLatitudes(km: number) {
  return km / 110.574;
}

function longitudesToKM(longitudes: number, atLatitude: number) {
  return longitudes * 111.32 * Math.cos(degreesToRadians(atLatitude));
}

function kMToLongitudes(km: number, atLatitude: number) {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
}
