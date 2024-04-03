import { IExchangeSubscribe } from '../../../exchange/interfaces/exchange.subscribe.interface'
import { WebSocketClient } from '../../../common/websocket'
import { converter } from './bithumb.subscribe.converter'
import { BithumbPublic } from '../public/bithumb.public'
import { constants } from '../../bithumb.constant'
import { SubscribeType } from '../../../exchange/enums/exchange.subscribe.enum'

export class BithumbSubscribe
  extends BithumbPublic
  implements IExchangeSubscribe
{
  constructor(connectKey?: string, secretKey?: string) {
    super(connectKey, secretKey)
  }

  async client(
    subscribe: SubscribeType,
    currency: string,
    unit: string
  ): Promise<WebSocketClient> {
    let type = null
    let convert = null

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
    }

    const data = {
      type: type,
      symbols: [`${currency}_${unit}`],
    }

    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!)
    return ws
  }
}
