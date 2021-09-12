import { RouteComponentProps } from "react-router-dom";

export type OwnerId = string;

export type Id = string;

export type NameId = {
  id: Id;
  name: string;
  owner: OwnerId;
};

export type RouterParams = void;

export type WithRouter = RouteComponentProps<RouterParams>;
