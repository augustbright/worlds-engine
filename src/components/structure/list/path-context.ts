import React, { useContext } from "react";

type PathContextData = {
  path: Array<string>;
};

const PathContext = React.createContext<PathContextData>({
  path: [],
});

export const PathProvider = PathContext.Provider;
export const usePathContext = () => useContext(PathContext);
