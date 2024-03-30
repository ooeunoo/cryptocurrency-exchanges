export const KORBIT_BASE_URL = "https://api.korbit.co.kr/v1";

export enum KORBIT_PUBLIC_DOMAIN {
  ticker = "/ticker/detailed/all",
}

export enum KORBIT_PRIVATE_DOMAIN {
  balance = "/user/balances",
  deposit_address = "/user/accounts",
}

export enum KORBIT_AUTH_DOMAIN {
  oauth2 = "/oauth2/access_token",
}
