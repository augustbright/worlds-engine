import React, { useMemo } from "react";
import styled from "styled-components";
import { Indent } from "../list/indent";
import { PathProvider, usePathContext } from "../path/path-context";
import { useNavigate } from "../pin-context";

type Props = {
  id: string;
  inline: boolean;
  children: (navigate: string | null) => React.ReactNode;
};

const Container = styled.div<{ inline: boolean }>`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 14px;
`;

export const ListItem = ({ children, inline, id }: Props) => {
  const { path } = usePathContext();
  const nextPathContext = useMemo(
    () => ({
      path: [...path, id],
    }),
    [path, id]
  );
  const navigate = useNavigate();

  return (
    <Container inline={inline}>
      {inline ? null : <Indent />}
      <PathProvider value={nextPathContext}>{children(navigate)}</PathProvider>
    </Container>
  );
};
