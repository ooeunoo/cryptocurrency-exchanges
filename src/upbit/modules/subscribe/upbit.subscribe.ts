import { v4 as uuidv4 } from 'uuid'
import { IExchangeSubscribe } from '../../../exchange/interfaces/exchange.subscribe.interface'
import { UpbitPublic } from '../public/upbit.public'
import { converter } from './upbit.subscribe.converter'
import { WebSocketClient } from '../../../common/websocket'
import { constants } from '../../upbit.constants'
import { SubscribeType } from '../../../exchange/enums/exchange.subscribe.enum'

export class UpbitSubscribe extends UpbitPublic implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey)
  }

  async client(
    subscribe: SubscribeType,
    currency: string,
    unit: string
  ): Promise<WebSocketClient> {
    let type = null
    let convert = null
    let header = null

    switch (subscribe) {
      case SubscribeType.ticker:
        type = constants.SubscribeType.ticker
        convert = converter.subscribeTicker
        break
      case SubscribeType.transaction:
        type = constants.SubscribeType.transaction
        convert = converter.subscribeTransaction
        break
      case SubscribeType.orderbook:
        type = constants.SubscribeType.orderbook
        convert = converter.subscribeOrderbook
        break
      case SubscribeType.myTransaction:
        type = constants.SubscribeType.myTransaction
        convert = converter.subscribeMyTransaction
        header = this.header()
        break
    }

    const data: Record<string, unknown>[] = [
      { ticket: uuidv4() },
      { type, codes: [`${unit}-${currency}`], isOnlyRealtime: true },
    ]

    const ws = new WebSocketClient(
      constants.websocketUrl,
      header as { [key: string]: string },
      data,
      convert
    )
    return ws
  }
}
