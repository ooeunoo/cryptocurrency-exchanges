import { IExchangeSubscribe } from '../../../exchange/interfaces/exchange.subscribe.interface'
import { WebSocketClient } from '../../../common/websocket'
import { converter } from './korbit.subscribe.converter'
import { KorbitShared } from '../shared/korbit.shared'
import { constants } from '../../korbit.constants'
import { SubscribeType } from '../../../exchange/enums/exchange.subscribe.enum'

export class KorbitSubscribe
  extends KorbitShared
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
    await this.header()

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
      accessToken: this.accessToken,
      timestamp: new Date().getTime(),
      event: 'korbit:subscribe',
      data: {
        channels: [`${type}:${currency.toLowerCase()}_${unit.toLowerCase()}`],
      },
    }
    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!)
    return ws
  }
}
