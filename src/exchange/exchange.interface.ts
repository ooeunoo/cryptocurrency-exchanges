export enum DepsoitState {
  PROCESSING,
  ACCEPTED,
  CANCELLED,
  REJECTED,
  TRAVEL_RULE_SUSPECTED,
  REFUNDING,
  REFUNDED,
}

export enum WithdrawState {
  WAITING,
  PROCESSING,
  DONE,
  FAILED,
  CANCELLED,
  REJECTED,
}

export enum OrderState {
  wait,
  watch,
  done,
  cancel,
}

export enum OrderSide {
  ask,
  bid,
}

export interface ExchangeMarket {
  currency: string;
  unit: string;
}

export interface ExchangeBalance {
  currency: string;
  balance: string;
}

export interface ExchangeDepositAddress {
  currency: string;
  network: string;
  address: string;
  memo: string;
}

export interface ExchangeDepositHistory {
  type: "deposit";
  txId: string;
  currency: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: string;
  confirmedAt: string;
}

export interface ExchangeWithdrawHistory {
  type: "withdraw";
  currency: string;
  txId: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: string;
  confirmedAt: string;
}

export interface ExchangeOrderHistory {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  amount: string; // 개수
  side: string; // ask
  fee: string; // 수수료
  createdAt: string;
}

export interface ExchangeMarketPrice {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 현재가
}
