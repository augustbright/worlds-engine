import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "components/common/icon-button";
import { PackageEditor } from "components/packages/package-editor";
import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Id } from "types/common";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  overflow-y: auto;
`;

export const PackagesEditPage: React.FC = () => {
  const match = useRouteMatch<{ packageId: Id }>();
  const history = useHistory();
  const handleClickBack = useCallback(() => {
    history.push("/packages");
  }, [history]);

  return (
    <PageContainer>
      <HeaderContainer>
        <IconButton icon={faAngleLeft} onClick={handleClickBack} />
      </HeaderContainer>
      <ContentContainer>
        <PackageEditor packageId={match.params.packageId} />
      </ContentContainer>
    </PageContainer>
  );
};
