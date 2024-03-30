export const COINONE_BASE_URL = "https://api.coinone.co.kr";

export enum COINONE_PUBLIC_ENDPOINT {
  ticker = "/public/v2/ticker_new/KRW",
  wallet_status = "/public/v2/currencies",
}

export enum COINONE_PRIVATE_ENDPOINT {
  balance = "/v2.1/account/balance/all",
}
