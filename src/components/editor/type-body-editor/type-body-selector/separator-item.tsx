import React from "react";
import styled from "styled-components";

const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SeparatorItem: React.FC = () => <Separator>-------</Separator>;
