import { useLocation } from "react-router-dom";

export const useQueryParameters = () =>
  new URLSearchParams(useLocation().search);
