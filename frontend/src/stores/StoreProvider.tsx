import React from "react";
import { alertStore } from "~/stores/AlertStore";

export const StoreContext = React.createContext({
  alertStore,
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={{
    alertStore,
  }}>
    {children}
  </StoreContext.Provider>
);