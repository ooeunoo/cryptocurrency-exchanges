import { method, request } from '../../../common/request/request'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../exchange/interfaces/exchange.public.interface'
import { KorbitShared } from '../shared/korbit.shared'
import { converter } from './korbit.public.converter'
import { constants } from '../../korbit.constants'
import { IKorbitMarket, IKorbitTicker } from './korbit.public.interface'
import { IResponse } from '../../../common/response/response.interface'
import { responseWarp } from '../../../common/response/response'
import { Exchange } from '../../../exchange/enums/exchange.enum'

export class KorbitPublic extends KorbitShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IResponse<IMarket[]>> {
    return responseWarp(async () => {
      const result = await request<IKorbitMarket[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.market
      )
      return converter.markets(result)
    }, Exchange.korbit)
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<IResponse<ITicker[]>> {
    return responseWarp(async () => {
      const result = await request<IKorbitTicker[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.ticker
      )
      return converter.tickers(result)
    }, Exchange.korbit)
  }
}
