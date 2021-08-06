export type OwnerId = string;

export type Id = string;

export type NameId = {
  id: Id;
  name: string;
  owner: OwnerId;
};
