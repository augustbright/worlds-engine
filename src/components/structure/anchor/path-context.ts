import React from "react";

type PathContextData = {
  path: Array<string>;
};

export const PathContext = React.createContext<PathContextData>({
  path: [],
});

export const PathProvider = PathContext.Provider;
