import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExternalDescriptors,
  selectTypeDescriptors,
} from "state/selectors/type-descriptors";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import { ExternalTypeDescriptor } from "types/descriptors";
import { TypeRefId } from "types/ref";

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
  const externalDescriptors = useSelector(selectExternalDescriptors);
  const descriptor = externalDescriptors[ref] || null;
  return descriptor;
};
