import axios from "axios";
import { Id } from "types/common";
import { Package } from "types/packages";
import { getApi, withToken } from "../../../api/utils";

export const getPackages = (): Promise<Array<Package>> =>
  axios.get(`${getApi()}/packages`, withToken()).then((data) => data.data);

export const updatePackage = (
  packageDescriptor: Package | Omit<Package, "_id">
): Promise<Id> =>
  axios
    .post(`${getApi()}/packages`, packageDescriptor, withToken())
    .then((data) => data.data);

export const deletePackage = (id: Id): Promise<void> =>
  axios
    .delete(`${getApi()}/packages/${id}`, withToken())
    .then((data) => data.data);
