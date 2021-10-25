import React, { useContext } from "react";

type TabContextData = {
  level: number;
};

const TabContext = React.createContext<TabContextData>({ level: 0 });

export const TabProvider = TabContext.Provider;
export const useTabContext = () => useContext(TabContext);
