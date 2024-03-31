export const KORBIT_BASE_URL = "https://api.korbit.co.kr/v1";

export enum KORBIT_PUBLIC_ENDPOINT {
  ticker = "/ticker/detailed/all",
}

export enum KORBIT_PRIVATE_ENDPOINT {
  balance = "/user/balances",
  deposit_address = "/user/accounts",
  history = "/user/transfers",
}

export enum KORBIT_AUTH_ENDPOINT {
  oauth2 = "/oauth2/access_token",
}
