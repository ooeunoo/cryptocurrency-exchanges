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
  ASK,
  BID,
}

export enum DepositWithdrawalType {
  DEPOSIT,
  WITHDRAWAL,
}

export interface ExchangeMarket {
  currency: string; // 통화 화폐
  unit: string; // 마켓
}

export interface ExchangeTicker {
  currency: string; // base
  unit: string; // quote
  high: string; //	고가 (24시간 기준)
  low: string; //	저가 (24시간 기준)
  first: string; //	시가 (24시간 기준)
  last: string; // 종가 (24시간 기준)
}

export interface ExchangeWalletStatus {
  currency: string; // 통화
  network: string; // 네트워크
  deposit: boolean; // 입금 가능 여부
  withdraw: boolean; // 출금 가능 여부
  withdrawMin?: string; // 최소 출금 금액
  withdrawFee?: string; // 출금 수수료
}

export interface ExchangeBalance {
  currency: string; // 통화
  balance: string; // 유동 수량
  lockedBalance: string; // 잠긴 수량
  avgBuyPrice: string; // 평단가
}

export interface ExchangeDepositAddress {
  currency: string; // 통화 화폐
  network: string; // 네트워크
  address: string; // 주소
  memo: string; // 메모 (태그) ex) 리플
}

export interface ExchangeDepositHistory {
  type: DepositWithdrawalType.DEPOSIT;
  txId: string;
  currency: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: number;
  confirmedAt: number;
}

export interface ExchangeWithdrawHistory {
  type: DepositWithdrawalType.WITHDRAWAL;
  currency: string;
  txId: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: number;
  confirmedAt: number;
}

export interface ExchangeOrderHistory {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  amount: string; // 개수
  side: string; // ask
  fee: string; // 수수료
  createdAt: number;
}

export interface ExchangeMarketPrice {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 현재가
}
