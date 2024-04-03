import { method, request } from '../../../common/request/request'
import { UpbitShared } from '../shared/upbit.shared'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../exchange/interfaces/exchange.public.interface'
import { converter } from './upbit.public.converter'
import { constants } from '../../upbit.constants'
import { IUpbitMarket, IUpbitTicker } from './upbit.public.interface'

export class UpbitPublic extends UpbitShared implements IExchangePublic {
  public async fetchMarkets(): Promise<IMarket[]> {
    const result = await request<IUpbitMarket[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.market
    )
    return converter.markets(result)
  }

  public async fetchTickers(): Promise<ITicker[]> {
    const markets = await this.fetchMarkets()
    const marketString = markets
      .map(({ currency, unit }) => `${unit}-${currency}`)
      .join(',')

    const result = await request<IUpbitTicker[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.ticker,
      {
        params: { markets: marketString },
      }
    )
    return converter.tickers(result)
  }
}
