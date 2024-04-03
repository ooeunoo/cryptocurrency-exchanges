import {
  IExchangePublicConverter,
  IMarket,
  ITicker,
} from '../../../common/interfaces/exchange.public.interface'
import { toBigNumberString } from '../../../utils/number'
import { IKorbitMarket, IKorbitTicker } from './korbit.public.interface'

export const converter: IExchangePublicConverter = {
  markets: (data: IKorbitMarket): IMarket[] => {
    return Object.keys(data).map((market) => {
      const [currency, unit] = market.split('_')
      return {
        currency: currency.toUpperCase(),
        unit: unit.toUpperCase(),
      }
    })
  },
  tickers: (data: IKorbitTicker): ITicker[] => {
    return Object.keys(data).map((market) => {
      const target = data[market]
      const [currency, unit] = market.split('_')

      return {
        currency: currency.toUpperCase(),
        unit: unit.toUpperCase(),
        high: toBigNumberString(target.high),
        low: toBigNumberString(target.low),
        first: toBigNumberString(target.open),
        last: toBigNumberString(target.last),
      }
    })
  },
}
