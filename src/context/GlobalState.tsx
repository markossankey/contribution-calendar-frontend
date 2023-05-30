import { ReactNode, createContext, useContext, useState } from "react";

const initialState = {
  visibleUser: "markossankey",
  setVisibleUser: (username: string) => {},
};

const GlobalState = createContext(initialState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [visibleUser, setVisibleUser] = useState(initialState.visibleUser);

  const value = {
    visibleUser,
    setVisibleUser,
  };

  return <GlobalState.Provider value={value}>{children}</GlobalState.Provider>;
};

export const useGlobalState = () => {
  const context = useContext(GlobalState);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
