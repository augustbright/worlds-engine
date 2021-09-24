import React from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createStore } from "state";
import { RoutingRoot } from "./routing-root";
import { AppInitialization } from "./app-initialization";
import { GlobalStyle } from "./global-style";

const store = createStore();

export default (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={code}>
        <GlobalStyle />
        <AppInitialization>
          <RoutingRoot />
        </AppInitialization>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </Provider>
  );
};
