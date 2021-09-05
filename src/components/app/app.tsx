import React from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import { Provider } from "react-redux";
import { createStore } from "state";
import { RoutingRoot } from "./routing-root";
import { AppInitialization } from "./app-initialization";

const store = createStore();

export default (): JSX.Element => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={code}>
          <AppInitialization>
            <RoutingRoot />
          </AppInitialization>
        </ThemeProvider>
      </Provider>
    </div>
  );
};
