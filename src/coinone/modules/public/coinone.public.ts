import { method, request } from '../../../common/request/request'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../exchange/interfaces/exchange.public.interface'
import { CoinoneShared } from '../shared/coinone.shared'
import { converter } from './coinone.public.converter'
import { constants } from '../../coinone.constants'
import { ICoinoneMarket, ICoinoneTicker } from './coinone.public.interface'
import { IResponse } from '../../../common/response/response.interface'
import { responseWarp } from '../../../common/response/response'
import { Exchange } from '../../../exchange/enums/exchange.enum'

export class CoinonePublic extends CoinoneShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IResponse<IMarket[]>> {
    return responseWarp(async () => {
      const result = await request<ICoinoneMarket[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.market
      )
      return converter.markets(result)
    }, Exchange.coinone)
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<IResponse<ITicker[]>> {
    return responseWarp(async () => {
      const result = await request<ICoinoneTicker[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.ticker
      )
      return converter.tickers(result)
    }, Exchange.coinone)
  }
}
