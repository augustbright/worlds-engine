import { useIsAppReady } from "hoc/application";
import { InitializationPage } from "pages/initialization-page";
import React from "react";

export const AppInitialization: React.FC = ({ children }) => {
  const isAppReady = useIsAppReady();
  return isAppReady ? <>{children}</> : <InitializationPage />;
};
