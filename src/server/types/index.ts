import { TypePureNameBody } from "types/descriptors";

export const get = async (): Promise<Array<TypePureNameBody>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: {
            id: "1",
            name: "Foo",
            owner: "System",
          },
          type: "pure-name",
        },
        {
          name: {
            id: "2",
            name: "Bar",
            owner: "System",
          },
          type: "pure-name",
        },
      ]);
    }, 2000);
  });
};
