import React from "react";

export const createItem = (f: (navigate: string | null) => React.ReactNode) =>
  f;
