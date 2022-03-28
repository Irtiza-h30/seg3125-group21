import React, { useContext } from "react";

const ConfigContext = React.createContext();

export function useConfig() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigContext provider");
  }

  return context;
}

export default ConfigContext;
