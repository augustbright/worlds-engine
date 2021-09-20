import axios from "axios";
import { getApi, withToken } from "./utils";

export const getTypeDescriptors = () =>
  axios.get(`${getApi()}/types`, withToken()).then((data) => {
    return data.data;
  });
