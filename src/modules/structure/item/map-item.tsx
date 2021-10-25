import React from "react";
import styled from "styled-components";

type Props = {
  keyContent: React.ReactNode;
  valueContent: React.ReactNode;
};

const ColumnContainer = styled.div`
  display: inline-block;
  height: 22px;
`;

export const MapItem: React.FC<Props> = ({ keyContent, valueContent }) => {
  return (
    <>
      {keyContent}
      <ColumnContainer>:</ColumnContainer>
      {valueContent}
    </>
  );
};
