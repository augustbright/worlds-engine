import axios from "axios";
import { Id } from "types/common";
import { TypeDescriptor } from "types/descriptors";
import { getApi, withToken } from "./utils";

export const getTypeDescriptors = (): Promise<Array<TypeDescriptor>> =>
  axios.get(`${getApi()}/types`, withToken()).then((data) => {
    return data.data;
  });

export const createTypeDescriptor = (
  descriptor: Omit<TypeDescriptor, "_id">
): Promise<Id> =>
  axios
    .post(`${getApi()}/types`, descriptor, withToken())
    .then((data) => data.data);

export const updateTypeDescriptor = (descriptor: TypeDescriptor): Promise<Id> =>
  axios
    .post(`${getApi()}/types`, descriptor, withToken())
    .then((data) => data.data);

export const deleteTypeDescriptor = (id: Id): Promise<void> =>
  axios
    .delete(`${getApi()}/types/${id}`, withToken())
    .then((data) => data.data);

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
