import { TickerChange, depositWithdrawType, depsoitWithdrawState, orderSide, orderState, orderType } from "./exchange.enum";

export interface IMarket {
  markets: string; // 마켓
}

export interface ITicker {
  currency: string; // base
  unit: string; // quote
  high: string; //	고가 (24시간 기준)
  low: string; //	저가 (24시간 기준)
  first: string; //	시가 (24시간 기준)
  last: string; // 종가 (24시간 기준)
}

export interface IWalletStatus {
  currency: string; // 통화
  network: string; // 네트워크
  deposit: boolean; // 입금 가능 여부
  withdraw: boolean; // 출금 가능 여부
  withdrawMin?: string; // 최소 출금 금액
  withdrawFee?: string; // 출금 수수료
}

export interface IBalance {
  currency: string; // 통화
  balance: string; // 유동 수량
  lockedBalance: string; // 잠긴 수량
  avgBuyPrice: string; // 평단가
}

export interface IDepositAddress {
  currency: string; // 통화 화폐
  network: string; // 네트워크
  address: string; // 주소
  memo: string; // 메모 (태그) ex) 리플
}

export interface IDepositWithdrawHistory {
  type: depositWithdrawType; // 타입 - 입금 / 출금
  txId: string; // 트랜잭션 아이디
  currency: string; // 통화 화폐
  network: string; // 네트워크
  amount: string; // 수량
  fee: string; // 수수료
  state: depsoitWithdrawState; //  상태
  fromAddress: string; // From 주소
  fromAddressTag: string; // To 주소의 태그
  toAddress: string; // To 주소
  toAddressTag: string; // To 주소의 태그
  createdAt: number; // 생성 일시
  confirmedAt: number; // 확정 일시
}

export interface IOrderHistory {
  id: string; // 주문 id
  type: orderType; // 타입 - 리밋 / 마켓/ 스탑 리밋
  side: orderSide; // 사이드 - 매수 / 매도
  state: orderState; // 주문 상태
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  orderAmount: string; // 주문 수량
  excutedAmount: string; // 체결 수량
  fee: string; // 수수료
  createdAt: number;
}

export interface IMarketPrice {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 현재가
}

export interface ISubscribeTicker {
  currency: string;
  unit: string;
  high: string; //	고가 (24시간 기준)
  low: string; //	저가 (24시간 기준)
  first: string; //	시가 (24시간 기준)
  last: string; // 종가 (24시간 기준)
  change: TickerChange; // 가격 변화
  accTradeVolume; // 누적 거래량(UTC 0시 기준)	Double
  accTradeVolume24h; // 24시간 누적 거래량	Double
  accTradePrice; // 누적 거래대금(UTC 0시 기준)	Double
  accTradePrice24h; // 24시간 누적 거래대금
  timestamp: number; // 타임스탬프
}

export interface ISubscribeAllTrade {
  currency: string;
  unit: string;
  price: string; // 가격
  amount: string; // 수량
  side: orderSide; // 사이드 - 매수 / 매도
  timestamp: number; // 타임스탬프
}

export interface ISubscribeOrderbook {
  currency: string;
  unit: string;
  orderbooks: {
    ask: { price: string; amount: string }[];
    bid: { price: string; amount: string }[];
  };
  timestamp: number;
}

export interface ISubscribeMyTrade {
  currency: string;
  unit: string;
  side: orderSide;
  price: string;
  amount: string;
  timestamp: number;
}
