import React from "react";
import { View } from "react-native";
import { Portal, Dialog } from "react-native-paper";

export const LongPressDialog: React.FC<TProps> = ({
  children,
  open,
  onDismiss,
}) => {
  return (
    <View>
      <Portal>
        <Dialog
          visible={open}
          dismissable={true}
          onDismiss={onDismiss}
          style={{
            borderRadius: 0,
          }}
        >
          <Dialog.Content>{children}</Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

type TProps = {
  children: React.ReactElement;
  open: boolean;
  onDismiss: () => void;
};
