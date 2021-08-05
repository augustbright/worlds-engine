import { TypePureNameBody } from "types/descriptors";

export const get = async (): Promise<Array<TypePureNameBody>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: {
            name: "Foo",
            owner: "System",
          },
          type: "pure-name",
        },
        {
          name: {
            name: "Bar",
            owner: "System",
          },
          type: "pure-name",
        },
      ]);
    }, 2000);
  });
};
