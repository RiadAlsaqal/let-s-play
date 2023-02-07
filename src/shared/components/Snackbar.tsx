import React from "react";
import { Snackbar as PaperSnackBar, SnackbarProps } from "react-native-paper";

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  children,
  onDismiss,
}) => {
  return (
    <PaperSnackBar visible={visible} onDismiss={onDismiss}>
      {children}
    </PaperSnackBar>
  );
};
