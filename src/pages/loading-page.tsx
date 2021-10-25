import { Loader } from "modules/abstract/components/loader";
import React from "react";
import styled from "styled-components";
import { LayoutBase } from "./layout/base";

const Center = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(black, transparent);
`;

const Text = styled.div`
  margin-top: 8px;
`;

export const LoadingPage: React.FC = ({ children }) => (
  <LayoutBase>
    <Center>
      <Loader />
      <Text>{children || "Loading"}</Text>
    </Center>
  </LayoutBase>
);
