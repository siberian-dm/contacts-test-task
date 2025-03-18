import axios, { AxiosError } from 'axios';

export const getApiErrorMsg = (err: unknown) => {
  let message = String(err);

  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data?.message) {
      message = error.response?.data?.message;
    } else {
      message = err.message;
    }
  }
  return message;
};
