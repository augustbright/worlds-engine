import { IconButton } from "modules/common/components/icon-button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";
import styled from "styled-components";
import { fromThemeProp } from "modules/theming/utils";
import { Color } from "modules/theming";
import { Space } from "modules/theming/types";

type Props = {
  title: React.ReactNode;
  onClose: () => void;
};

const Container = styled.div`
  display: flex;
  padding: 0 ${fromThemeProp((t) => t.space[Space.MEDIUM])};
  background: ${fromThemeProp((t) => t.colors[Color.ASSET_HEADER_BACKGROUND])};
`;

const TitleContainer = styled.div`
  flex: 1 1 auto;
`;

const CloseContainer = styled.div`
  flex: 0 0 auto;
`;

export const AssetHeader: React.FC<Props> = ({ title, onClose }) => {
  const handleClickClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Container>
      <TitleContainer>{title}</TitleContainer>
      <CloseContainer>
        <IconButton icon={faTimes} size="sm" onClick={handleClickClose} />
      </CloseContainer>
    </Container>
  );
};
