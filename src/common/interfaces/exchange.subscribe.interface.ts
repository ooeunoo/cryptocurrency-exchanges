import { orderSide, subscribeType, tickerChange } from '../../common/enum'
import { WebSocketClient } from '../websocket'

export interface IExchangeSubscribe {
  client(
    type: subscribeType,
    currency: string,
    unit: string
  ): Promise<WebSocketClient>
}

export interface IExchangeSubscribeConverter {
  subscribeTicker: (res: unknown) => ISubscribeTicker | null
  subscribeTransaction: (res: unknown) => ISubscribeTransaction | null
  subscribeOrderbook: (data: unknown) => ISubscribeOrderbook | null
  subscribeMyTransaction?: (data: unknown) => ISubscribeMyTransaction | null
}

export interface ISubscribeTicker {
  currency: string
  unit: string
  high: string //	고가 (24시간 기준)
  low: string //	저가 (24시간 기준)
  first: string //	시가 (24시간 기준)
  last: string // 종가 (24시간 기준)
  change: tickerChange // 가격 변화
  accTradeVolume: string | null // 누적 거래량(UTC 0시 기준)	Double
  accTradeVolume24h: string | null // 24시간 누적 거래량	Double
  accTradePrice: string | null // 누적 거래대금(UTC 0시 기준)	Double
  accTradePrice24h: string | null // 24시간 누적 거래대금
  timestamp: number // 타임스탬프
}

export interface ISubscribeTransaction {
  currency: string
  unit: string
  price: string // 가격
  amount: string // 수량
  side: orderSide // 사이드 - 매수 / 매도
  timestamp: number // 타임스탬프
}

export interface IOrderBook {
  ask: IOrderBookData[]
  bid: IOrderBookData[]
}

export interface IOrderBookData {
  price: string
  amount: string
}

export interface ISubscribeOrderbook {
  currency: string
  unit: string
  orderbooks: IOrderBook
  timestamp: number
}

export interface ISubscribeMyTransaction {
  currency: string
  unit: string
  side: orderSide
  price: string
  amount: string
  timestamp: number
}
