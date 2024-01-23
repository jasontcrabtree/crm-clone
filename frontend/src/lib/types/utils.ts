export type ApiReqContract = {
  method: string;
  headers: {
    'X-API-KEY': string;
    'Content-Type': string;
    Authorization: string;
  };
  body?: string | null;
};
