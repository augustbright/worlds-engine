import { isSystemDescriptor } from "func/types";
import { HeaderLayout } from "modules/abstract/components/header.layout";
import { loadableContent } from "modules/abstract/func";
import { AssetHeader } from "modules/application/components/asset-header";
import { TypeBodyEditor } from "modules/editor/type-body-editor/type-body-editor";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React, { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { TypeBody } from "types/descriptors";
import { useRefDescriptor, useUpdateOwnDescriptor } from "../hook";
import { TypeTitle } from "./type-title";

const ContentContainer = styled.div`
  padding: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const TypeContent: React.FC = () => {
  const history = useHistory();
  const { packageId, typeId } =
    useParams<{ packageId: string; typeId: string }>();

  const handleClickClose = useCallback(() => {
    history.push(`/assets/package/${packageId}`);
  }, [history, packageId]);

  const typeDescriptorQuery = useRefDescriptor(typeId);
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const handleChangeBody = useCallback(
    (newBody: TypeBody) => {
      updateOwnDescriptor.mutate({
        _id: typeId,
        body: newBody,
      });
    },
    [updateOwnDescriptor, typeId]
  );

  const content = loadableContent(typeDescriptorQuery, (descriptor) => {
    if (!descriptor) return null;
    if (isSystemDescriptor(descriptor)) return null;
    return (
      <TypeBodyEditor body={descriptor.body} onChange={handleChangeBody} />
    );
  });

  return (
    <HeaderLayout
      header={
        <AssetHeader
          title={<TypeTitle typeId={typeId} />}
          onClose={handleClickClose}
        />
      }
      content={<ContentContainer>{content}</ContentContainer>}
    />
  );
};
