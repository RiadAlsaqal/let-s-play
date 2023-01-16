import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Button as B1 } from "react-native";
import { Button, Text, Dialog, Portal, useTheme } from "react-native-paper";
import { useMyLocation } from "../hooks";
import Icon from "react-native-vector-icons/FontAwesome5";
export const Map: React.FC<TMapView> = ({ setLocation }) => {
  const [open, setOpen] = useState(false);
  const [chose, setChose] = useState<true | null | false>(null);
  const theme = useTheme();
  const { getMyLocatiopn } = useMyLocation();
  const ref1 = useRef<any>(null);
  const [chosenLocation, setChosenLocation] = useState<TLocation>();
  const goToMyLocation = (location: TLocation) => {
    setTimeout(() => ref1.current.animateToRegion(location, 3 * 1000), 3000);
    console.log("reeef", ref1.current);
  };
  const handleCoseDialog = (chose1: boolean) => {
    setOpen(false);
    chose !== true && setChose(chose1);
  };
  return (
    <>
      <Button
        icon={chose === false ? "close" : chose === true ? "check" : ""}
        textColor={
          chose === false
            ? theme.colors.error
            : chose === true
            ? theme.colors.primary
            : ""
        }
        onPress={async () => {
          const myLocation = await getMyLocatiopn();
          if (Boolean(myLocation)) {
            setChosenLocation(myLocation as TLocation);
            setOpen(true);
            console.log(myLocation, "dasdadsad");
            goToMyLocation(myLocation as TLocation);
          }
        }}
      >
        location
      </Button>
      <View style={styles.container}>
        <Portal>
          <Dialog
            visible={open}
            onDismiss={() => handleCoseDialog(false)}
            style={styles.container}
          >
            <Dialog.Content style={styles.container}>
              <MapView
                style={styles.map}
                ref={ref1}
                onPress={({
                  nativeEvent: {
                    coordinate: { latitude, longitude },
                  },
                }) => {
                  setChosenLocation(
                    (prev) => ({ ...prev, latitude, longitude } as TLocation)
                  );
                }}
              >
                <Marker
                  coordinate={{
                    latitude: chosenLocation?.latitude as number,
                    longitude: chosenLocation?.longitude as number,
                  }}
                />
              </MapView>
              <Button
                mode="contained"
                onPress={() => {
                  setLocation(chosenLocation as TLocation);
                  setChose(true);
                  handleCoseDialog(true);
                }}
              >
                chose
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

type TMapView = {
  setLocation: (location: TLocation) => void;
};

type TLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
