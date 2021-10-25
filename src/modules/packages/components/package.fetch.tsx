import React from "react";
import { Id } from "types/common";

type Props = {
  id: Id;
};

export const PackageFetch: React.FC<Props> = ({ id }) => {
  return <>package fetch {id}</>;
};
