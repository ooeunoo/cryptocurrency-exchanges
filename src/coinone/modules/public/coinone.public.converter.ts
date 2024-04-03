import {
  IExchangePublicConverter,
  IMarket,
  ITicker,
} from '../../../exchange/interfaces/exchange.public.interface'
import { toBigNumberString } from '../../../utils/number'
import { ICoinoneMarket, ICoinoneTicker } from './coinone.public.interface'

export const converter: IExchangePublicConverter = {
  markets: (res: ICoinoneMarket): IMarket[] => {
    const data = res.tickers
    return data.map(({ quote_currency, target_currency }) => {
      return {
        currency: target_currency.toUpperCase(),
        unit: quote_currency.toUpperCase(),
      }
    })
  },
  tickers: (res: ICoinoneTicker): ITicker[] => {
    const data = res.tickers

    return data.map(
      ({ quote_currency, target_currency, high, low, first, last }) => {
        return {
          currency: target_currency.toUpperCase(),
          unit: quote_currency.toUpperCase(),
          high: toBigNumberString(high),
          low: toBigNumberString(low),
          first: toBigNumberString(first),
          last: toBigNumberString(last),
        }
      }
    )
  },
}
