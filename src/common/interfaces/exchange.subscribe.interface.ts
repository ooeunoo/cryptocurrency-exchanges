import { orderSide, subscribeType, tickerChange } from "@common/enum";

export interface IExchangeSubscribe {
  client(type: subscribeType, currency: string, unit: string);
}

export interface IExchangeSubscribeConverter {
  subscribeTicker: (data) => ISubscribeTicker;
  subscribeTransaction: (data) => ISubscribeTransaction;
  subscribeOrderbook: (data) => ISubscribeOrderbook;
  subscribeMyTransaction?: (data) => ISubscribeMyTransaction;
}

export interface ISubscribeTicker {
  currency: string;
  unit: string;
  high: string; //	고가 (24시간 기준)
  low: string; //	저가 (24시간 기준)
  first: string; //	시가 (24시간 기준)
  last: string; // 종가 (24시간 기준)
  change: tickerChange; // 가격 변화
  accTradeVolume: string; // 누적 거래량(UTC 0시 기준)	Double
  accTradeVolume24h: string; // 24시간 누적 거래량	Double
  accTradePrice: string; // 누적 거래대금(UTC 0시 기준)	Double
  accTradePrice24h: string; // 24시간 누적 거래대금
  timestamp: number; // 타임스탬프
}

export interface ISubscribeTransaction {
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

export interface ISubscribeMyTransaction {
  currency: string;
  unit: string;
  side: orderSide;
  price: string;
  amount: string;
  timestamp: number;
}
