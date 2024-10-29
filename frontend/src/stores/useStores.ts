import React from "react";
import { StoreContext } from "./StoreProvider";

export const useStores = () => React.useContext(StoreContext);