import React from "react";
import { UseQueryResult } from "react-query";
import { Loader } from "./components/loader";

export const loadableContent = <TData,>(
  query: UseQueryResult<TData>,
  render: (data: TData) => React.ReactNode
) => {
  if (query.isLoading || query.data === undefined) {
    return <Loader />;
  }
  return render(query.data);
};
