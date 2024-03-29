export const UPBIT_BASE_URL = "https://api.upbit.com/v1";

export enum UPBIT_PUBLIC_ENDPOINT {
  market_all = "/market/all",
  ticker = "/ticker",
}

export enum UPBIT_PRIVATE_ENDPOINT {
  balance = "/accounts",
  order = "/orders",
  deposits = "/deposits",
  withdraws = "/withdraws",
  deposit_coin_address = "/deposits/coin_address",
}
