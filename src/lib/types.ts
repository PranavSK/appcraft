export type KeysOfType<ObjectType, ValueType> = {
  [K in keyof ObjectType]: ObjectType[K] extends ValueType ? K : never;
}[keyof ObjectType];

export type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Serializable[]
  | { [key: string]: Serializable };
