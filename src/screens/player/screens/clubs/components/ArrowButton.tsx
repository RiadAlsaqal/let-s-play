import React from "react";
import { IconButton } from "react-native-paper";

export const ArrowButton: React.FC<TProps> = ({ onPress }) => {
  return <IconButton size={40} icon="arrow-right" onPress={onPress} />;
};

type TProps = {
  onPress: () => void;
};
