import axios from "axios";
import { TypeDescriptor } from "types/descriptors";
import { getApi, withToken } from "./utils";

export const getTypeDescriptors = (): Promise<Array<TypeDescriptor>> =>
  axios.get(`${getApi()}/types`, withToken()).then((data) => {
    return data.data;
  });

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
