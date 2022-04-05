export type GetKeyType<
  T extends string,
  R extends Record<string, unknown>
> = T extends keyof R ? R[T] : unknown;

export type CreateActionType<T, R> = {
  type: T;
  data?: R;
};

export function createAction<T, R>(type: T, data?: R) {
  return {
    type,
    data
  };
}
