import React from "react";
import {
  deleteTypeDescriptor,
  getExternalType,
  getTypeDescriptors,
  updateTypeDescriptor,
} from "api/editor";
import { ErrorToast } from "components/editor/toasts/error";
import { getSystemTypeDescriptors } from "func/system";
import { isSystemRef } from "func/types";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { toast } from "react-toastify";
import { Id } from "types/common";
import { SystemTypeDescriptor, TypeDescriptor } from "types/descriptors";
import { TypeRefId } from "types/ref";
import { Name } from "components/editor/word/name";

export const useOwnDescriptors = () =>
  useQuery(["own-descriptors"], () => getTypeDescriptors());

export const useUpdateOwnDescriptor = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (descriptor: TypeDescriptor | Omit<TypeDescriptor, "_id">) =>
      updateTypeDescriptor(descriptor),
    {
      onSuccess: (
        _data,
        descriptor: TypeDescriptor | Omit<TypeDescriptor, "_id">
      ) => {
        queryClient.invalidateQueries(["own-descriptors"]);
        if ("_id" in descriptor) {
          queryClient.invalidateQueries(["ref-descriptor", descriptor._id]);
        }
      },
      onError: (error: Error, descriptor) => {
        toast.error(
          <ErrorToast
            message="Failed to update type"
            name={<Name>{descriptor.name}</Name>}
            details={error.message}
          />
        );
      },
    }
  );
};

export const useDeleteOwnDescriptor = () => {
  const queryClient = useQueryClient();
  return useMutation((id: Id) => deleteTypeDescriptor(id), {
    onSuccess: (_data, id: Id) => {
      queryClient.invalidateQueries(["own-descriptors"]);
      queryClient.invalidateQueries(["ref-descriptor", id]);
    },
  });
};

export const useRefDescriptor = (ref: TypeRefId) => {
  const ownDescriptorsQuery = useOwnDescriptors();
  return useQuery(
    ["ref-descriptor", ref],
    async () => {
      const systemDescriptors = getSystemTypeDescriptors();
      const ownDescriptors = ownDescriptorsQuery.data || [];

      if (isSystemRef(ref)) {
        const descriptor = systemDescriptors[ref] || null;
        return descriptor;
      }

      const ownDescriptor = ownDescriptors.find(
        (descriptor) => descriptor._id === ref
      );
      if (ownDescriptor) {
        return ownDescriptor;
      }

      return getExternalType(ref);
    },
    {
      enabled: !!ownDescriptorsQuery.data,
    }
  );
};

export const useRefDescriptors = (refs: Array<TypeRefId>) => {
  const ownDescriptorsQuery = useOwnDescriptors();
  return useQueries(
    refs.map((ref) => ({
      queryKey: ["ref-descriptor", ref],
      queryFn: async () => {
        const systemDescriptors = getSystemTypeDescriptors();
        const ownDescriptors = ownDescriptorsQuery.data || [];

        if (isSystemRef(ref)) {
          const descriptor = systemDescriptors[ref] || null;
          return descriptor;
        }

        const ownDescriptor = ownDescriptors.find(
          (descriptor) => descriptor._id === ref
        );
        if (ownDescriptor) {
          return ownDescriptor;
        }

        return getExternalType(ref);
      },
      enabled: !!ownDescriptorsQuery.data,
    }))
  ) as Array<UseQueryResult<TypeDescriptor | SystemTypeDescriptor | null>>;
};
