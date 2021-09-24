import React from "react";
import styled from "styled-components";
import { Indent } from "../list/indent";

type Props = {
  id: string;
  inline: boolean;
  indented: boolean;
};

const Container = styled.div<{ inline: boolean }>`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 14px;
  font-family: "FiraCode";
  font-weight: normal;
`;

export const ListItem: React.FC<Props> = ({ indented, inline, children }) => {
  return (
    <Container inline={inline}>
      {indented ? <Indent /> : null}
      {children}
    </Container>
  );
};
