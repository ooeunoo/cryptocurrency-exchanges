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
  currency: string; // 통화 화폐
  unit: string; // 마켓
}

export interface ExchangeBalance {
  currency: string; // 통화 화폐
  balance: string; // 유동 수량
  lockedBalance: string; // 묶여있는 수량
  avgBuyPrice: string; // 평단가
}

export interface ExchangeDepositAddress {
  currency: string; // 통화 화폐
  network: string; // 네트워크
  address: string; // 주소
  memo: string; // 메모 (태그) ex) 리플
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
