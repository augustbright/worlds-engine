import React, { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import DescriptorEditor from "components/blocks/descriptor-editor";
import { PureTypeDescriptor } from "types/descriptors";
import { Id } from "types/common";
import { id, entities, info, filtrator } from "../../mocks/descriptors";

const mockTypeDescriptors = [id, entities, info, filtrator];

export default (): JSX.Element => {
  const [typeDescriptors, setTypeDescriptors] = useState(mockTypeDescriptors);
  const onChangeTypeDescriptors = useCallback(
    (newTypes: Array<PureTypeDescriptor>) => {
      setTypeDescriptors(newTypes);
    },
    [setTypeDescriptors]
  );

  const onDeleteTypeDescriptor = useCallback(
    (deletedId: Id) => {
      setTypeDescriptors(
        typeDescriptors.filter((descriptor) => descriptor.name.id !== deletedId)
      );
    },
    [setTypeDescriptors, typeDescriptors]
  );

  return (
    <div>
      <ThemeProvider theme={code}>
        <DescriptorEditor
          types={typeDescriptors}
          onChangeTypes={onChangeTypeDescriptors}
          onDeleteType={onDeleteTypeDescriptor}
        />
      </ThemeProvider>
    </div>
  );
};
