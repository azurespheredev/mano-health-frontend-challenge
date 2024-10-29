import React from "react";
import { alertStore } from "~/stores/AlertStore";
import { mrfStore } from "~/stores/MRFStore";

export const StoreContext = React.createContext({
  alertStore,
  mrfStore,
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={{
    alertStore,
    mrfStore,
  }}>
    {children}
  </StoreContext.Provider>
);