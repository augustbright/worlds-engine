import axios from "axios";
import { Id, Rearrangeble } from "types/common";
import { TypeDescriptor } from "types/descriptors";
import { getApi, withToken } from "../../../api/utils";

export type GetTypeDescriptorsQuery = Partial<{
  packageId: Id;
}>;

export const getTypeDescriptors = (
  query: GetTypeDescriptorsQuery = {}
): Promise<Array<TypeDescriptor>> =>
  axios
    .get(
      `${getApi()}/types`,
      withToken({
        params: query,
      })
    )
    .then((data) => {
      return data.data;
    });

export const updateTypeDescriptor = (
  descriptor: TypeDescriptor | Omit<TypeDescriptor, "_id">
): Promise<Id> =>
  axios
    .post(`${getApi()}/types`, descriptor, withToken())
    .then((data) => data.data);

export const deleteTypeDescriptor = (id: Id): Promise<void> =>
  axios
    .delete(`${getApi()}/types/${id}`, withToken())
    .then((data) => data.data);

export const rearrangeDescriptors = (items: Array<Rearrangeble>) =>
  axios
    .post(`${getApi()}/descriptors/rearrange`, items, withToken())
    .then((data) => data.data);

export const getExternalType = (id: Id): Promise<TypeDescriptor | null> =>
  axios
    .get(`${getApi()}/types/external/${id}`, withToken())
    .then((data) => data.data || null);

export const getExternalTypes = (
  query: string
): Promise<Array<TypeDescriptor>> =>
  axios
    .get(
      `${getApi()}/types/external`,
      withToken({
        params: {
          query,
        },
      })
    )
    .then((data) => data.data);
