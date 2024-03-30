export const UPBIT_BASE_URL = "https://api.upbit.com/v1";

export enum UPBIT_PUBLIC_ENDPOINT {
  market_all = "/market/all",
  ticker = "/ticker",
  wallet_status = "/status/wallet",
}

export enum UPBIT_PRIVATE_ENDPOINT {
  balance = "/accounts",
  order = "/orders",
  deposits = "/deposits",
  withdraws = "/withdraws",
  deposit_addresses = "/deposits/coin_addresses",
}
