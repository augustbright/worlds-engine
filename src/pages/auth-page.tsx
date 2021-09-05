import { getApi } from "api/utils";
import React from "react";
import { LayoutBase } from "./layout/base";

export const AuthPage: React.FC = () => (
  <LayoutBase>
    <a href={`${getApi()}/auth/google`}>Log in with google</a>
  </LayoutBase>
);
