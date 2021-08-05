import React from "react";
import { ThemeProvider } from "styled-components";
import { code } from "components/theming";
import { id, entities, info, filtrator } from "../../mocks/descriptors";
import DescriptorEditor from "components/blocks/descriptor-editor";

const mockTypeDescriptors = [id, entities, info, filtrator];

export default (): JSX.Element => (
  <div>
    <ThemeProvider theme={code}>
        <DescriptorEditor types={mockTypeDescriptors}/>
    </ThemeProvider>
  </div>
);
