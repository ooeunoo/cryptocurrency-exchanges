import { method, request } from '../../../common/request/request'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../common/interfaces/exchange.public.interface'
import { CoinoneShared } from '../shared/coinone.shared'
import { converter } from './coinone.public.converter'
import { constants } from '../../coinone.constants'
import { ICoinoneMarket, ICoinoneTicker } from './coinone.public.interface'

export class CoinonePublic extends CoinoneShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IMarket[]> {
    const result = await request<ICoinoneMarket[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.market
    )
    return converter.markets(result)
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const result = await request<ICoinoneTicker[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.ticker
    )
    return converter.tickers(result)
  }
}
