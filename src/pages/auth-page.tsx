import { getApi } from "api/utils";
import { IconButton } from "components/common/icon-button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";
import { LayoutBase } from "./layout/base";

const Center = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  text-transform: uppercase;
  border-bottom: solid 1px rgb(28, 25, 32);
  width: 300px;
  display: flex;
  justify-content: center;
  margin-bottom: ${fromThemeProp((t) => t.space[Space.HUGE])};
  padding-bottom: ${fromThemeProp((t) => t.space[Space.LARGE])};
  text-shadow: 0 0 10px rgb(224 206 237 / 28%);
  color: #ece1f4;
  padding-bottom: 8px;
`;

const AuthContainer = styled.div`
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
