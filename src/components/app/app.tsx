import React from "react";
import TypesBlock from "components/types-block";
import { id, entities, info, filtrator } from "../../mocks/descriptors";

const mockDescriptors = [id, entities, info, filtrator];

export default (): JSX.Element => <TypesBlock descriptors={mockDescriptors} />;
