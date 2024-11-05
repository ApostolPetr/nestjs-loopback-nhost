export type ResponseData<T> =
  | {
      payload: T;
      code: 'OK';
      timestamp: number;
    }
  | {
      error: T;
      code: 'ERROR';
      timestamp: number;
    };

export const createSuccessPayload = <T>(payload: T): ResponseData<T> => {
  return {
    payload,
    code: 'OK',
    timestamp: Date.now(),
  };
};

export const createErrorPayload = <T>(error: T): ResponseData<T> => {
  return {
    error,
    code: 'ERROR',
    timestamp: Date.now(),
  };
};
