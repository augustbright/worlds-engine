import React from "react";
import styled from "styled-components";
import { Indent } from "./indent";
import { useTabContext } from "./tab-context";

type Props = {
  id: string;
  inline: boolean;
};

const Container = styled.div<{ inline: boolean }>`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 14px;
`;

export const ListItem: React.FC<Props> = ({ children, inline }) => {
  const { level } = useTabContext();

  return (
    <Container inline={inline}>
      {inline ? null : <Indent offset={level} />}
      {children}
    </Container>
  );
};
