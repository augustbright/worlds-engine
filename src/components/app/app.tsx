import React, { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import { id, entities, info, filtrator } from "../../mocks/descriptors";
import DescriptorEditor from "components/blocks/descriptor-editor";
import { PureTypeDescriptor } from "types/descriptors";

const mockTypeDescriptors = [id, entities, info, filtrator];

export default (): JSX.Element => {
  const [typeDescriptors, setTypeDescriptors] = useState(mockTypeDescriptors);
  const onChangeTypeDescriptors = useCallback((newTypes: Array<PureTypeDescriptor>) => {
    setTypeDescriptors(newTypes);
  }, [setTypeDescriptors]);

  return (
    <div>
      <ThemeProvider theme={code}>
          <DescriptorEditor types={typeDescriptors} onChangeTypes={onChangeTypeDescriptors}/>
      </ThemeProvider>
    </div>
  )
};
