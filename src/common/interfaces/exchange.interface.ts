import { Exchange } from '../enum'
import { IExchangePrivate } from './exchange.private.interface'
import { IExchangePublic } from './exchange.public.interface'
import { IExchangeSubscribe } from './exchange.subscribe.interface'

export interface IExchange {
  public: IExchangePublic
  private: IExchangePrivate
  subscribe: IExchangeSubscribe
}

export interface IExcahngeResponse {
  platform: Exchange
  data: unknown
}
