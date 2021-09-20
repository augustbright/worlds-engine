import React from "react";

type Props = {
  keyContent: React.ReactNode;
  valueContent: React.ReactNode;
};

export const MapItem: React.FC<Props> = ({ keyContent, valueContent }) => {
  return (
    <>
      {keyContent}:{valueContent}
    </>
  );
};
