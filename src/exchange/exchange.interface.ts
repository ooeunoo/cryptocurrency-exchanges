export enum depsoitWithdrawState {
  canceled = "canceled", // 취소
  waiting = "waiting", // 대기
  processing = "processing", // 진행
  accepted = "accepted", // 확정
  rejected = "rejected", // 거절
  failed = "failed", // 실패
  travel_rule_suspected = "travel_rule_suspected", // 트래블룰 의심
  refunded = "refunded", // 환불
}

export enum orderState {
  wait = "wait",
  watch = "watch",
  done = "done",
  cancel = "cancel",
}

export enum orderType {
  limit = "limit",
  market = "market",
  stop_limit = "stop_limit",
  best = "best",
}

export enum orderSide {
  ask = "ask",
  bid = "bid",
}

export enum depositWithdrawType {
  deposit = "deposit",
  withdraw = "withdraw",
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

export interface ExchangeDepositWithdrawHistory {
  type: depositWithdrawType; // 타입 - 입금 / 출금
  txId: string; // 트랜잭션 아이디
  currency: string; // 통화 화폐
  network: string; // 네트워크
  amount: string; // 수량
  fee: string; // 수수료
  state: depsoitWithdrawState; //  상태
  fromAddress: string; // From 주소
  toAddress: string; // To 주소
  toAddressTag: string; // To 주소의 태그
  createdAt: number; // 생성 일시
  confirmedAt: number; // 확정 일시
}

export interface ExchangeOrderHistory {
  id: string; // 주문 id
  type: orderType; // 타입 - 리밋 / 마켓/ 스탑 리밋
  side: orderSide; // 사이드 - 매수 / 매도
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  orderAmount: string; // 주문 수량
  excutedAmount: string; // 체결 수량
  fee: string; // 수수료
  createdAt: number;
}

export interface ExchangeMarketPrice {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 현재가
}
