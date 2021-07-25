import {
  PureTypeDescriptor,
  EffectTypeDescriptor,
  SelectorDescriptor,
  ActionDescriptor,
  EntityDescriptor,
} from './descriptors';

const Id: PureTypeDescriptor = {
  name: 'Id',
  body: {
    type: 'pure-name',
    name: {
      name: 'Number',
      owner: 'system',
    },
  },
};

const GetEnemies: SelectorDescriptor = {
  name: 'GetEnemies',
  body: {
    type: 'name',
    name: {
      name: 'Filter',
      owner: 'system',
    },
    params: {
      list: {
        type: 'name',
        name: {
          name: 'GetEntitiesAround',
          owner: 'system',
        },
        params: {},
      },
      condition: {
        type: 'value',
        value: {
          type: 'selector',
          selector: {
            name: 'IsEnemy',
            owner: 'system',
          },
        },
      },
    },
  },
};

const strategy: ActionDescriptor = {
  name: 'Strategy',
  steps: [
    {
      type: 'decision',
      condition: {
        type: 'name',
        name: {
          name: 'IsInDanger',
          owner: 'system',
        },
        params: {
          area: {
            type: 'value',
            value: {
              type: 'number',
              number: 5,
            },
          },
        },
      },
      true: [
        {
          type: 'effect',
          name: {
            name: 'message',
            owner: 'system',
          },
          params: {
            message: {
              type: 'value',
              value: {
                type: 'string',
                string: 'SOS',
              },
            },
            channels: {
              type: 'value',
              value: {
                type: 'list',
                entityType: {
                  name: 'String',
                  owner: 'system',
                },
                list: [
                  {
                    type: 'string',
                    string: 'neighbours',
                  },
                ],
              },
            },
          },
        },
        {
          type: 'effect',
          name: {
            name: 'move',
            owner: 'system',
          },
          params: {
            direction: {
              type: 'name',
              name: {
                name: 'GetSafeDirection',
                owner: 'system',
              },
              params: {},
            },
          },
        },
      ],
      false: [
        {
          type: 'effect',
          name: {
            name: 'earn',
            owner: 'system',
          },
          params: {},
        },
      ],
    },
  ],
};

const entity: EntityDescriptor = {
  name: 'SimpleEntity',
  strategy: {
    name: 'Strategy',
    owner: 'system',
  },
};
