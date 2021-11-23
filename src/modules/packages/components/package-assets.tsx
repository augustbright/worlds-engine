import { Collapse } from "modules/abstract/components/collapse";
import { loadableContent } from "modules/abstract/func";
import { AddTypeDescriptor } from "modules/editor/add-type-descriptor";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import { TypeAsset } from "modules/types/components/type-asset";
import { useOwnDescriptors } from "modules/types/hook";
import React from "react";
import styled from "styled-components";
import { Id } from "types/common";

type Props = {
  packageId: Id;
};

const Content = styled.div`
  padding: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const PackageAssets: React.FC<Props> = ({ packageId }) => {
  const typesQuery = useOwnDescriptors({ packageId });

  const typesContent = loadableContent(typesQuery, (data) => {
    if (data.length) {
      return (
        <Collapse title="types">
          {data.map((descriptor) => (
            <TypeAsset key={descriptor._id} typeId={descriptor._id} />
          ))}
          <AddTypeDescriptor packageId={packageId} />
        </Collapse>
      );
    }
    return <AddTypeDescriptor packageId={packageId} />;
  });

  return <Content>{typesContent}</Content>;
};
