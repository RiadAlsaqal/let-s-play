import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { useMyLocation } from "../hooks";
import { TLocation } from "@src/shared/types";
export const Map: React.FC<TMapView> = ({ setLocation }) => {
  const [open, setOpen] = useState(false);
  const [chose, setChose] = useState<true | null | false>(null);
  const theme = useTheme();
  const { getMyLocatiopn } = useMyLocation();
  const ref1 = useRef<any>(null);
  const [chosenLocation, setChosenLocation] = useState<TLocation>();
  const goToMyLocation = (location: TLocation) => {
    setTimeout(() => ref1?.current?.animateToRegion(location, 3 * 1000), 3000);
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
