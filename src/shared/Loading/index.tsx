import React from "react";
import { Loader } from "../components";
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
        {loading && <Loader />}
      </>
    </LoadingContext.Provider>
  );
};
export const useHandleLoading = () => {
  const loading = React.useContext(LoadingContext);

  return loading;
};

type TProps = {
  children: React.ReactElement;
};

type TLoadingContext = {
  loading: boolean;
  handleLoading: Function | null;
};
