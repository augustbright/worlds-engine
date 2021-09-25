import { isSystemRef } from "func/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExternalDescriptors,
  selectSystemDescriptors,
  selectTypeDescriptors,
} from "state/selectors/type-descriptors";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import {
  NotFoundDescriptor,
  SystemTypeDescriptor,
  TypeDescriptor,
} from "types/descriptors";
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
): TypeDescriptor | SystemTypeDescriptor | NotFoundDescriptor | null => {
  const dispatch = useDispatch();
  const systemDescriptors = useSelector(selectSystemDescriptors);
  const descriptors = useSelector(selectTypeDescriptors);
  const external = useSelector(selectExternalDescriptors);

  // System descriptor
  if (isSystemRef(ref)) {
    const descriptor = systemDescriptors[ref] || null;
    return descriptor;
  }

  // Own descriptor
  if (ref in descriptors) {
    return descriptors[ref];
  }

  // External descriptor
  dispatch(typeDescriptorsSlice.actions.requireId(ref));
  return external[ref] || null;
};
