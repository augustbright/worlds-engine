import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTypeDescriptors } from "state/selectors/type-descriptors";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";

export const useTypeDescriptors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(typeDescriptorsSlice.actions.load());
  }, [dispatch]);

  return {
    descriptors: useSelector(selectTypeDescriptors),
  };
};
