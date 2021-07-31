import {
  PureTypeDescriptor,
  SelectorDescriptor,
  ActionDescriptor,
  EntityDescriptor,
} from "types/descriptors";

export const id: PureTypeDescriptor = {
  name: "Id",
  body: {
    type: "pure-name",
    name: {
      name: "Number",
      owner: "system",
    },
  },
};

export const entities: PureTypeDescriptor = {
  name: "Entities",
  body: {
    type: "pure-name",
    name: {
      name: "List",
      owner: "system",
    },
    params: [
      {
        type: "pure-name",
        name: {
          name: "Entity",
          owner: "system",
        },
      },
      {
        type: "pure-name",
        name: {
          name: "Filtrator",
          owner: "system",
        },
      },
    ],
  },
};

export const filtrator: PureTypeDescriptor = {
  name: "Filtrator",
  params: ["T"],
  body: {
    type: "selector",
    params: {
      item: {
        type: "param",
        param: "T",
      },
    },
    returns: {
      type: "pure-name",
      name: {
        name: "Boolean",
        owner: "system",
      },
    },
  },
};

export const info: PureTypeDescriptor = {
  name: "Info",
  params: ["T1", "T2"],
  body: {
    type: "pure-map",
    map: {
      field1: {
        type: "pure-name",
        name: {
          name: "Id",
          owner: "system",
        },
      },
      field2: {
        type: "param",
        param: "T",
      },
      filtrator: {
        type: "pure-name",
        name: {
          name: "Filtrator",
          owner: "system",
        },
        params: [{ type: "param", param: "T" }],
      },
      map: {
        type: "pure-map",
        map: {
          sub1: {
            type: "pure-name",
            name: {
              name: "String",
              owner: "system",
            },
          },
          sub2: {
            type: "pure-name",
            name: {
              name: "String",
              owner: "system",
            },
          },
        },
      },
    },
  },
};

export const getEnemies: SelectorDescriptor = {
  name: "GetEnemies",
  params: {},
  returnType: {
    type: "pure-name",
    name: {
      name: "List",
      owner: "system",
    },
    params: [
      {
        type: "pure-name",
        name: {
          name: "Entity",
          owner: "system",
        },
      },
    ],
  },
  body: {
    type: "name",
    name: {
      name: "Filter",
      owner: "system",
    },
    params: {
      list: {
        type: "name",
        name: {
          name: "GetEntitiesAround",
          owner: "system",
        },
        params: {},
      },
      condition: {
        type: "value",
        value: {
          type: "selector",
          selector: {
            name: "IsEnemy",
            owner: "system",
          },
        },
      },
    },
  },
};

export const strategy: ActionDescriptor = {
  name: "Strategy",
  steps: [
    {
      type: "decision",
      condition: {
        type: "name",
        name: {
          name: "IsInDanger",
          owner: "system",
        },
        params: {
          area: {
            type: "value",
            value: {
              type: "number",
              number: 5,
            },
          },
        },
      },
      true: [
        {
          type: "effect",
          name: {
            name: "message",
            owner: "system",
          },
          params: {
            message: {
              type: "value",
              value: {
                type: "string",
                string: "SOS",
              },
            },
            channels: {
              type: "value",
              value: {
                type: "list",
                entityType: {
                  name: "String",
                  owner: "system",
                },
                list: [
                  {
                    type: "string",
                    string: "neighbours",
                  },
                ],
              },
            },
          },
        },
        {
          type: "effect",
          name: {
            name: "move",
            owner: "system",
          },
          params: {
            direction: {
              type: "name",
              name: {
                name: "GetSafeDirection",
                owner: "system",
              },
              params: {},
            },
          },
        },
      ],
      false: [
        {
          type: "effect",
          name: {
            name: "earn",
            owner: "system",
          },
          params: {},
        },
      ],
    },
  ],
};

export const entity: EntityDescriptor = {
  name: "SimpleEntity",
  strategy: {
    name: "Strategy",
    owner: "system",
  },
};
