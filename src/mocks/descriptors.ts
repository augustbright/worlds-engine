import {
  PureTypeDescriptor,
  SelectorDescriptor,
  ActionDescriptor,
  EntityDescriptor,
  TypePureBody,
} from "types/descriptors";

export const numberNameId = {
  id: "2",
  name: "Number",
  owner: "system",
};

export const idNameId = {
  id: "1",
  name: "Id",
  owner: "User",
};

export const entitiesNameId = {
  id: "3",
  name: "Entities",
  owner: "User",
};

export const listNameId = {
  id: "4",
  name: "List",
  owner: "system",
};

export const entityNameId = {
  id: "5",
  name: "Entity",
  owner: "system",
};

export const filtratorNameId = {
  id: "6",
  name: "Filtrator",
  owner: "system",
};

export const booleanNameId = {
  id: "7",
  name: "Boolean",
  owner: "system",
};

export const infoNameId = {
  id: "8",
  name: "Info",
  owner: "User",
};

export const stringNameId = {
  id: "9",
  name: "String",
  owner: "system",
};

export const numberBody: TypePureBody = {
  type: "pure-name",
  name: numberNameId,
};

export const id: PureTypeDescriptor = {
  name: idNameId,
  body: numberBody,
};

export const entities: PureTypeDescriptor = {
  name: entitiesNameId,
  body: {
    type: "pure-name",
    name: listNameId,
    params: [
      {
        type: "pure-name",
        name: entityNameId,
      },
      {
        type: "pure-name",
        name: filtratorNameId,
      },
    ],
  },
};

export const filtrator: PureTypeDescriptor = {
  name: filtratorNameId,
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
      name: booleanNameId,
    },
  },
};

export const info: PureTypeDescriptor = {
  name: infoNameId,
  params: ["T1", "T2"],
  body: {
    type: "pure-map",
    map: {
      field1: {
        type: "pure-name",
        name: idNameId,
      },
      field2: {
        type: "param",
        param: "T",
      },
      filtrator: {
        type: "pure-name",
        name: filtratorNameId,
        params: [{ type: "param", param: "T" }],
      },
      map: {
        type: "pure-map",
        map: {
          sub1: {
            type: "pure-name",
            name: stringNameId,
          },
          sub2: {
            type: "pure-name",
            name: stringNameId,
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
    name: listNameId,
    params: [
      {
        type: "pure-name",
        name: entityNameId,
      },
    ],
  },
  body: {
    type: "name",
    name: {
      id: "14",
      name: "Filter",
      owner: "system",
    },
    params: {
      list: {
        type: "name",
        name: {
          id: "15",
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
            id: "16",
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
          id: "10",
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
            id: "11",
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
                entityType: listNameId,
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
            id: "11",
            name: "move",
            owner: "system",
          },
          params: {
            direction: {
              type: "name",
              name: {
                id: "12",
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
            id: "13",
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
    id: "14",
    name: "Strategy",
    owner: "system",
  },
};
