import { getApi } from "api/utils";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React from "react";
import styled from "styled-components";
import { IconButton } from "modules/common/components/icon-button";
import { LayoutBase } from "./layout/base";

const Center = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(black, transparent);
`;

const Header = styled.h1`
  font-size: 40px;
  letter-spacing: 6px;
  text-transform: uppercase;
  border-bottom: solid 1px rgb(28, 25, 32);
  width: 300px;
  display: flex;
  justify-content: center;
  margin-bottom: ${fromThemeProp((t) => t.space[Space.HUGE])};
  padding-bottom: ${fromThemeProp((t) => t.space[Space.LARGE])};
  text-shadow: 0 0 40px rgb(224 206 237 / 28%);
  color: #ece1f4;
  padding-bottom: 8px;
`;

const AuthContainer = styled.div`
  margin-top: -60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${fromThemeProp((t) => t.space[Space.HUGE])}
    ${fromThemeProp((t) => t.space[Space.LARGE])};
  border: solid 1px rgb(28, 25, 32);
  background-color: rgb(21, 18, 23);
`;

const StyledIconButton = styled(IconButton)`
  text-decoration: underline;
`;

export const AuthPage: React.FC = () => (
  <LayoutBase>
    <Center>
      <AuthContainer>
        <Header>Worlds</Header>{" "}
        <StyledIconButton
          href={`${getApi()}/auth/google`}
          icon={faGoogle}
          size="sm"
        >
          Log in with google
        </StyledIconButton>
      </AuthContainer>
    </Center>
  </LayoutBase>
);
