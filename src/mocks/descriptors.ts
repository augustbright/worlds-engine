import { Body, TypeDescriptor } from "types/descriptors";
import { SystemRef } from "types/ref";

/*
{
    "name": "Map 2",
    "body": {
			"type": "map",
			"map": {
				"key1": {
					"type": "ref",
					"ref": "__type_number"
				},
				"key2": {
					"type": "map",
					"map": {
						"subkey1": {
							"type": "ref",
							"ref": "__type_boolean"
						},
						"subkey2": {
							"type": "ref",
							"ref": "__type_list",
							"params": {
								"type": {
									"type": "param",
									"param": "entity"
								}
							}
						}
					}
				},
				"key3": {
					"type": "selector",
					"params": {
						"arg1": {
							"type": "ref",
							"ref": "__type_number"
						},
						"arg2": {
							"type": "ref",
							"ref": "__type_boolean"
						}
					},
					"returns": {
						"type": "ref",
						"ref": "__type_list",
						"params": {
							"type": {
								"type": "ref",
								"ref": "__type_string"
							}
						}
					}
				}
			}
    }
}
*/

export const body1: TypeDescriptor = {
  _id: "mockId",
  name: "Map 1",
  body: {
    type: Body.MAP,
    map: {
      key1: {
        type: Body.REF,
        name: "Number",
        ref: SystemRef.NUMBER,
      },
      key2: {
        type: Body.MAP,
        map: {
          subkey1: {
            type: Body.REF,
            name: "Boolean",
            ref: SystemRef.BOOLEAN,
          },
          subkey2: {
            type: Body.REF,
            name: "List",
            ref: SystemRef.LIST,
            params: {
              type: {
                type: Body.PARAM,
                param: "entity",
              },
            },
          },
        },
      },
      key3: {
        type: Body.SELECTOR,
        params: {
          arg1: {
            type: Body.REF,
            name: "Number",
            ref: SystemRef.NUMBER,
          },
          arg2: {
            type: Body.REF,
            name: "Boolean",
            ref: SystemRef.BOOLEAN,
          },
        },
        returns: {
          type: Body.REF,
          name: "List",
          ref: SystemRef.LIST,
          params: {
            type: {
              type: Body.REF,
              name: "String",
              ref: SystemRef.STRING,
            },
          },
        },
      },
    },
  },
};
