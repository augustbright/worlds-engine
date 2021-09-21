import React from "react";
import styled from "styled-components";
import { Indent } from "../list/indent";

type Props = {
  id: string;
  inline: boolean;
};

const Container = styled.div<{ inline: boolean }>`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 14px;
`;

export const ListItem: React.FC<Props> = ({ inline, children }) => {
  return (
    <Container inline={inline}>
      {inline ? null : <Indent />}
      {children}
    </Container>
  );
};
