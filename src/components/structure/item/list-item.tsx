import React, { useMemo } from "react";
import styled from "styled-components";
import { useTabContext } from "../tab-context";
import { Indent } from "../list/indent";
import { PathProvider, usePathContext } from "../path/path-context";

type Props = {
  id: string;
  inline: boolean;
};

const Container = styled.div<{ inline: boolean }>`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 14px;
`;

export const ListItem: React.FC<Props> = ({ children, inline, id }) => {
  const { level } = useTabContext();
  const { path } = usePathContext();
  const nextPathContext = useMemo(
    () => ({
      path: [...path, id],
    }),
    [path, id]
  );

  return (
    <Container inline={inline}>
      {inline ? null : <Indent offset={level} />}
      <PathProvider value={nextPathContext}>{children}</PathProvider>
    </Container>
  );
};
