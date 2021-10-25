import React from "react";
import { ErrorToast } from "modules/editor/toasts/error";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Id } from "types/common";
import { TypeRefId } from "types/ref";
import { Name } from "modules/editor/word/name";
import { Package } from "types/packages";
import {
  deletePackage,
  getPackages,
  updatePackage,
} from "modules/packages/api/requests";

export const useOwnPackages = () =>
  useQuery(["own-packages"], () => getPackages());

export const useUpdateOwnPackage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (packageDescriptor: Package | Omit<Package, "_id">) =>
      updatePackage(packageDescriptor),
    {
      onSuccess: (_data, packageDescriptor: Package | Omit<Package, "_id">) => {
        queryClient.invalidateQueries(["own-packages"]);
        if ("_id" in packageDescriptor) {
          queryClient.invalidateQueries(["ref-package", packageDescriptor._id]);
        }
      },
      onError: (error: Error, packageDescriptor) => {
        toast.error(
          <ErrorToast
            message="Failed to update package"
            name={<Name>{packageDescriptor.name}</Name>}
            details={error.message}
          />
        );
      },
    }
  );
};

export const useDeleteOwnPackage = () => {
  const queryClient = useQueryClient();
  return useMutation((id: Id) => deletePackage(id), {
    onSuccess: (_data, id: Id) => {
      queryClient.invalidateQueries(["own-packages"]);
      queryClient.invalidateQueries(["ref-package", id]);
    },
  });
};

export const useRefPackage = (ref: TypeRefId) => {
  const ownPackagesQuery = useOwnPackages();
  return useQuery(
    ["ref-package", ref],
    async () => {
      const ownPackages = ownPackagesQuery.data || [];

      const ownPackage = ownPackages.find(
        (packageDescriptor) => packageDescriptor._id === ref
      );
      if (ownPackage) {
        return ownPackage;
      }
      return null;
    },
    {
      enabled: !!ownPackagesQuery.data,
    }
  );
};
