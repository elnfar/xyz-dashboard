'use client';

import React from "react";
import { createContext, useContext } from "react";
import userStore from "./useStore";

// Create a context for MobX stores
const StoresContext = createContext({
  userStore,
});

// Custom hook to use the MobX stores
export const useStores = () => useContext(StoresContext);

const MobXProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoresContext.Provider value={{ userStore }}>
      {children}
    </StoresContext.Provider>
  );
};

export default MobXProvider;
