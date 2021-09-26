import { RouteComponentProps } from "react-router-dom";

export type Id = string;

export type RouterParams = void;

export type WithRouter = RouteComponentProps<RouterParams>;

export type User = {
  id: string;
  jwt: string;
};
