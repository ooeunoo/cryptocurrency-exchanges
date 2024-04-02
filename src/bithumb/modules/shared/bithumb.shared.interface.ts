export interface IBithumbResponse<T> {
  status: string;
  data: T;
}

export interface IBithumbHeader {
  "Api-Key": string;
  "Api-Sign": string;
  "Api-Nonce": number;
}
