import {
  IExchangePublicConverter,
  IMarket,
  ITicker,
} from '../../../common/interfaces/exchange.public.interface'
import { toBigNumberString } from '../../../utils/number'
import { IBithumbResponse } from '../shared/bithumb.shared.interface'
import {
  IBithumbMarket,
  IBithumbTicker,
  IBithumbTickerData,
} from './bithumb.public.interface'

export const converter: IExchangePublicConverter = {
  markets: (): IMarket[] => {
    return []
  },
  tickers: (): ITicker[] => {
    return []
  },
  marketskrw: (res: IBithumbResponse<IBithumbMarket>): IMarket[] => {
    const data: IBithumbMarket = res.data
    delete data['date']
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: 'KRW' }
    })
  },
  marketsbtc: (res: IBithumbResponse<IBithumbMarket>): IMarket[] => {
    const data: IBithumbTicker = res.data
    delete data['date']
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: 'BTC' }
    })
  },
  tickerskrw: (res: IBithumbResponse<IBithumbTicker>): ITicker[] => {
    const data: IBithumbTicker = res.data
    delete data['date']
    return Object.keys(data).map((currency) => {
      const target = data[currency] as IBithumbTickerData
      return {
        currency: currency.toUpperCase(),
        unit: 'KRW',
        high: toBigNumberString(target.max_price),
        low: toBigNumberString(target.min_price),
        first: toBigNumberString(target.opening_price),
        last: toBigNumberString(target.closing_price),
      }
    })
  },
  tickersbtc: (res: IBithumbResponse<IBithumbTicker>): ITicker[] => {
    const data: IBithumbTicker = res.data
    delete data['date']
    return Object.keys(data).map((currency) => {
      const target = data[currency] as IBithumbTickerData
      return {
        currency: currency.toUpperCase(),
        unit: 'BTC',
        high: toBigNumberString(target.max_price),
        low: toBigNumberString(target.min_price),
        first: toBigNumberString(target.opening_price),
        last: toBigNumberString(target.closing_price),
      }
    })
  },
}
