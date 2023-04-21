export type Action<TPayload> = {
  type: string;
  payload: TPayload;
};
