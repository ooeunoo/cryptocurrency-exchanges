import { IExchangeSubscribe } from '../../../exchange/interfaces/exchange.subscribe.interface'
import { WebSocketClient } from '../../../common/websocket'
import { converter } from './coinone.subscribe.converter'
import { CoinonePublic } from '../public/coinone.public'
import { constants } from '../../coinone.constants'
import { SubscribeType } from '../../../exchange/enums/exchange.subscribe.enum'

export class CoinoneSubscribe
  extends CoinonePublic
  implements IExchangeSubscribe
{
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
      request_type: 'SUBSCRIBE',
      channel: type,
      topic: {
        quote_currency: unit,
        target_currency: currency,
      },
    }
    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!)
    return ws
  }
}
