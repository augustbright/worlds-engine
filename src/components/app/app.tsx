import React from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RoutingRoot } from "./routing-root";
import { OAuthHandler } from "./oauth-handler";
import { GlobalStyle } from "./global-style";

const queryClient = new QueryClient();

export default (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={code}>
        <GlobalStyle />
        <OAuthHandler>
          <RoutingRoot />
        </OAuthHandler>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
