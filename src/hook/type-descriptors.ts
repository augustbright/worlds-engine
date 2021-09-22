import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSystemDescriptors,
  selectTypeDescriptors,
} from "state/selectors/type-descriptors";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import { ExternalTypeDescriptor } from "types/descriptors";
import { SystemRef, TypeRefId } from "types/ref";

export const useTypeDescriptors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(typeDescriptorsSlice.actions.load());
  }, [dispatch]);

  return {
    descriptors: useSelector(selectTypeDescriptors),
  };
};

export const useRefDescriptor = (
  ref: TypeRefId
): ExternalTypeDescriptor | null => {
  const isSystemRef = (testRef: TypeRefId): testRef is SystemRef => {
    return Object.values(SystemRef).includes(testRef as SystemRef);
  };
  const systemDescriptors = useSelector(selectSystemDescriptors);
  if (isSystemRef(ref)) {
    const descriptor = systemDescriptors[ref] || null;
    return descriptor;
  }
  return null;
};
