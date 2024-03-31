export const BITHUMB_BASE_URL = "https://api.bithumb.com";

export enum BITHUMB_PUBLIC_ENDPOINT {
  ticker = "/public/ticker",
  support_networks = "/public/assetsstatus/multichain/ALL",
}

export enum BITHUMB_PRIVATE_ENDPOINT {
  balance = "/info/balance",
  deposit_address = "/info/wallet_address",
  info_user_transactions = "/info/user_transactions",
}
