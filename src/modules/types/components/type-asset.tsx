import { loadableContent } from "modules/abstract/func";
import { AssetLink } from "modules/assets/components/asset-link";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Id } from "types/common";
import { useRefDescriptor } from "../hook";

type Props = {
  typeId: Id;
};

export const TypeAsset: React.FC<Props> = ({ typeId }) => {
  const { url } = useRouteMatch();
  const typeDescriptorQuery = useRefDescriptor(typeId);

  const content = loadableContent(typeDescriptorQuery, (descriptor) => {
    return (
      <AssetLink to={`${url}/type/${typeId}`}>{descriptor?.name}</AssetLink>
    );
  });

  return <>{content}</>;
};
