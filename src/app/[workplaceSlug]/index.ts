import { createContext, useContext } from "react";
import userStore from "./useStore";

export const storesContext = createContext({
  userStore,
});

export const useStores = () => useContext(storesContext);
