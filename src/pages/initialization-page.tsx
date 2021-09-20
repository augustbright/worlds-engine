import { useIsAppReady } from "hook/application";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initApplication } from "state/actions/common";
import { googleOAuthCallback } from "api/auth";
import { setToken } from "api/utils";

export const InitializationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAppReady = useIsAppReady();
  useEffect(() => {
    if (window.location.pathname === "/auth/google/redirect") {
      googleOAuthCallback(window.location.search).then((result) => {
        setToken(result.access_token);
        window.location.replace("/");
      });
      return;
    }
    if (!isAppReady) {
      dispatch(initApplication());
    }
  }, [dispatch, isAppReady]);

  return <span>loading...</span>;
};
