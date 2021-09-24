import { ErrorToast } from "components/editor/toasts/error";
import React from "react";
import { toast } from "react-toastify";

type errorCallbackOptions = {
  message: string;
  name?: React.ReactNode;
};

export const createErrorCallback =
  ({ message, name }: errorCallbackOptions) =>
  (error: Error) => {
    toast(<ErrorToast message={message} name={name} details={error.message} />);
  };
