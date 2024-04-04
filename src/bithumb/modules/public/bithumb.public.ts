import { method, request } from '../../../common/request/request'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../exchange/interfaces/exchange.public.interface'
import { BithumbShared } from '../shared/bithumb.shared'
import { converter } from './bithumb.public.converter'
import { constants } from '../../bithumb.constant'
import { IBithumbResponse } from '../shared/bithumb.shared.interface'
import { IBithumbMarket, IBithumbTicker } from './bithumb.public.interface'
import { responseWarp } from '../../../common/response/response'
import { Exchange } from '../../../exchange/enums/exchange.enum'
import { IResponse } from '../../../common/response/response.interface'

export class BithumbPublic extends BithumbShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IResponse<IMarket[]>> {
    return responseWarp(async () => {
      const resultkrw: IBithumbResponse<IBithumbMarket[]> = await request<
        IBithumbResponse<IBithumbMarket[]>
      >(method.get, constants.apiUrl, constants.endpoints.market + '/ALL_KRW')
      const resultbtc: IBithumbResponse<IBithumbMarket[]> = await request<
        IBithumbResponse<IBithumbMarket[]>
      >(method.get, constants.apiUrl, constants.endpoints.market + '/ALL_BTC')
      return converter
        .marketskrw(resultkrw)
        .concat(converter.marketsbtc(resultbtc))
    }, Exchange.bithumb)
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<IResponse<ITicker[]>> {
    return responseWarp(async () => {
      const resultkrw: IBithumbResponse<IBithumbTicker[]> = await request<
        IBithumbResponse<IBithumbTicker[]>
      >(method.get, constants.apiUrl, constants.endpoints.ticker + '/ALL_KRW')
      const resultbtc: IBithumbResponse<IBithumbTicker[]> = await request<
        IBithumbResponse<IBithumbTicker[]>
      >(method.get, constants.apiUrl, constants.endpoints.ticker + '/ALL_BTC')
      return converter
        .tickerskrw(resultkrw)
        .concat(converter.tickersbtc(resultbtc))
    }, Exchange.bithumb)
  }
}
