import DescriptorEditor from "components/blocks/descriptor-editor";
import React, { useCallback, useState } from "react";
import { PureTypeDescriptor, TypePureBody } from "types/descriptors";
import { Id } from "types/common";
import { id, entities, info, filtrator } from "../mocks/descriptors";
import { PageLayout } from "./layout/page";

const mockTypeDescriptors = [id, entities, info, filtrator];

export const MainPage: React.FC = () => {
  const [typeDescriptors, setTypeDescriptors] = useState(mockTypeDescriptors);
  const onChangeTypeDescriptor = useCallback(
    (changedId: Id, newDescriptor: PureTypeDescriptor) => {
      setTypeDescriptors(
        typeDescriptors.map((oldDescriptor) => {
          if (oldDescriptor.name.id === changedId) {
            return newDescriptor;
          }
          return oldDescriptor;
        })
      );
    },
    [setTypeDescriptors, typeDescriptors]
  );

  const onDeleteTypeDescriptor = useCallback(
    (deletedId: Id) => {
      setTypeDescriptors(
        typeDescriptors.filter((descriptor) => descriptor.name.id !== deletedId)
      );
    },
    [setTypeDescriptors, typeDescriptors]
  );

  const onAddTypeDescriptor = useCallback(() => {
    setTypeDescriptors([
      ...typeDescriptors,
      {
        name: {
          id: "-1",
          name: "",
          owner: "User",
        },
        body: {} as TypePureBody,
      },
    ]);
  }, [setTypeDescriptors, typeDescriptors]);

  return (
    <PageLayout>
      <DescriptorEditor
        types={typeDescriptors}
        onChangeType={onChangeTypeDescriptor}
        onDeleteType={onDeleteTypeDescriptor}
        onAddType={onAddTypeDescriptor}
      />
    </PageLayout>
  );
};
