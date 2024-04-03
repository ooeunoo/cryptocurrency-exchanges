import {
  ISubscribeTransaction,
  ISubscribeTicker,
  ISubscribeOrderbook,
  ISubscribeMyTransaction,
  IOrderBook,
} from '../../../exchange/interfaces/exchange.subscribe.interface'
import {
  IUpbitSubscribeTransaction,
  IUpbitSubscribeTicker,
  IUpbitSubscribeOrderbook,
  IUpbitSubscribeMyTransaction,
} from './upbit.subscribe.interface'
import { toBigNumberString } from '../../../utils/number'
import { TickerChange } from '../../../exchange/enums/exchange.subscribe.enum'
import { OrderSide } from '../../../exchange/enums/exchange.private.enum'

export const converter = {
  subscribeTicker: (data: IUpbitSubscribeTicker): ISubscribeTicker | null => {
    const [unit, currency] = data.code.split('-')
    const convertChange = (change: string): TickerChange => {
      switch (change) {
        case 'FALL':
          return TickerChange.fall
        case 'RISE':
          return TickerChange.rise
        case 'EVEN':
          return TickerChange.even
        default:
          return TickerChange.unknown
      }
    }
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      high: toBigNumberString(data.high_price),
      low: toBigNumberString(data.low_price),
      first: toBigNumberString(data.opening_price),
      last: toBigNumberString(data.trade_price),
      change: convertChange(data.change),
      accTradeVolume: toBigNumberString(data.acc_trade_volume),
      accTradeVolume24h: toBigNumberString(data.acc_trade_price_24h),
      accTradePrice: toBigNumberString(data.acc_trade_price),
      accTradePrice24h: toBigNumberString(data.acc_trade_price_24h),
      timestamp: data.timestamp,
    }
  },
  subscribeTransaction: (
    data: IUpbitSubscribeTransaction
  ): ISubscribeTransaction | null => {
    const [unit, currency] = data.code.split('-')
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      price: toBigNumberString(data.trade_price),
      amount: toBigNumberString(data.trade_volume),
      side: data.ask_bid == 'ASK' ? OrderSide.ask : OrderSide.bid,
      timestamp: data.trade_timestamp,
    }
  },
  subscribeOrderbook: (
    data: IUpbitSubscribeOrderbook
  ): ISubscribeOrderbook | null => {
    const [unit, currency] = data.code.split('-')
    const orderbooks: IOrderBook = {
      ask: [],
      bid: [],
    }

    data.orderbook_units.map(({ ask_price, bid_price, ask_size, bid_size }) => {
      orderbooks.ask.push({
        price: toBigNumberString(ask_price),
        amount: toBigNumberString(ask_size),
      })
      orderbooks.bid.push({
        price: toBigNumberString(bid_price),
        amount: toBigNumberString(bid_size),
      })
    })

    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      orderbooks,
      timestamp: data.timestamp,
    }
  },
  subscribeMyTransaction: (
    data: IUpbitSubscribeMyTransaction
  ): ISubscribeMyTransaction | null => {
    const [unit, currency] = data.code.split('-')

    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      side: data.ask_bid == 'ASK' ? OrderSide.ask : OrderSide.bid,
      price: toBigNumberString(data.price),
      amount: toBigNumberString(data.volume),
      timestamp: data.trade_timestamp,
    }
  },
}
