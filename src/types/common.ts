import { RouteComponentProps } from "react-router-dom";

export type Id = string;

export type RouterParams = void;

export type WithRouter = RouteComponentProps<RouterParams>;

export type Profile = {
  id: string;
  name?: string;
};

export type User = {
  jwt: string;
} & Profile;

export type ProfileFormValues = {
  name: string;
};

export type Rearrangeble = {
  _id: string;
  order?: number;
};
