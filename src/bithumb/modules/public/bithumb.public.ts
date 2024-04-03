import { method, request } from '../../../common/request/request'
import {
  IExchangePublic,
  IMarket,
  ITicker,
} from '../../../common/interfaces/exchange.public.interface'
import { BithumbShared } from '../shared/bithumb.shared'
import { converter } from './bithumb.public.converter'
import { constants } from '../../bithumb.constant'
import { IBithumbResponse } from '../shared/bithumb.shared.interface'
import { IBithumbMarket, IBithumbTicker } from './bithumb.public.interface'

export class BithumbPublic extends BithumbShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IMarket[]> {
    const resultkrw: IBithumbResponse<IBithumbMarket[]> = await request<
      IBithumbResponse<IBithumbMarket[]>
    >(method.get, constants.apiUrl, constants.endpoints.market + '/ALL_KRW')
    const resultbtc: IBithumbResponse<IBithumbMarket[]> = await request<
      IBithumbResponse<IBithumbMarket[]>
    >(method.get, constants.apiUrl, constants.endpoints.market + '/ALL_BTC')
    return converter
      .marketskrw(resultkrw)
      .concat(converter.marketsbtc(resultbtc))
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const resultkrw: IBithumbResponse<IBithumbTicker[]> = await request<
      IBithumbResponse<IBithumbTicker[]>
    >(method.get, constants.apiUrl, constants.endpoints.ticker + '/ALL_KRW')
    const resultbtc: IBithumbResponse<IBithumbTicker[]> = await request<
      IBithumbResponse<IBithumbTicker[]>
    >(method.get, constants.apiUrl, constants.endpoints.ticker + '/ALL_BTC')
    return converter
      .tickerskrw(resultkrw)
      .concat(converter.tickersbtc(resultbtc))
  }
}
