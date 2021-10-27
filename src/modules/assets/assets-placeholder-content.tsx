import { Placeholder } from "modules/abstract/components/placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import { fromThemeProp } from "modules/theming/utils";
import { Space } from "modules/theming/types";

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const AssetsPlaceholderContent: React.FC = () => (
  <Placeholder>
    <StyledIcon icon={faArrowLeft} size="sm" />
    Choose package or create a new one to start{" "}
  </Placeholder>
);
