export const UPBIT_BASE_URL = "https://api.upbit.com/v1";

export enum UPBIT_PUBLIC_ENDPOINT {
  market_all = "market/all",
}

export enum UPBIT_PRIVATE_ENDPOINT {
  balance = "accounts",
  order = "orders",
  deposits = "deposits",
  withdraws = "withdraws",
  deposit_coin_address = "deposits/coin_address",
}

export const api = {
  /* ------------------public-------------------- */
  fetchMarket: "https://api.upbit.com/v1/market/all",

  /* ------------------private-------------------- */
  // 잔액 조회
  fetchBalance: "https://api.upbit.com/v1/accounts",
  // 주문 내역 조회
  fetchOrderHistory: "https://api.upbit.com/v1/orders",
  // 입금 내역 조회
  fetchDepositHistory: "https://api.upbit.com/v1/deposits",
  // 출금 내역 조회
  fetchWithdrawHistory: "https://api.upbit.com/v1/withdraws",
  // 입금 주소 조히
  fetchDepositAddresses: "https://api.upbit.com/v1/deposits/coin_addresses",
};
