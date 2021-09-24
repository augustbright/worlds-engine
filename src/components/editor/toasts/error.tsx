import React from "react";

type Props = {
  message: string;
  name?: React.ReactNode;
  details?: string;
};

export const ErrorToast: React.FC<Props> = ({ message, name, details }) => (
  <>
    <div>
      {message}{" "}
      {name ? (
        <>
          {": "}
          {name}
        </>
      ) : null}
    </div>
    {details ? <div>{details}</div> : null}
  </>
);
