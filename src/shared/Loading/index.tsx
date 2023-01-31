import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useApolloClient } from "@apollo/client";

const LoadingContext = React.createContext<TLoadingContext>({
  handleLoading: null,
  loading: false,
});

export const LoadingProvider: React.FC<TProps> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  const handleLoading = React.useCallback((status: boolean) => {
    setLoading(status);
  }, []);
  const providerValue = {
    loading,
    handleLoading,
  };
  return (
    <LoadingContext.Provider value={providerValue}>
      <>
        {children}
        {loading && (
          <View style={style.View}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </>
    </LoadingContext.Provider>
  );
};
export const useHandleLoading = () => {
  const loading = React.useContext(LoadingContext);

  return loading;
};
const style = StyleSheet.create({
  View: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
});

type TProps = {
  children: React.ReactElement;
};

type TLoadingContext = {
  loading: boolean;
  handleLoading: Function | null;
};
