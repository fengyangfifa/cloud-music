export type GetKeyType<T extends string, R extends Record<string, unknown>> =
  T extends keyof R ? R[T] : unknown;
