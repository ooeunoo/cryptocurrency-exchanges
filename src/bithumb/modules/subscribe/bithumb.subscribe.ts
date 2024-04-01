import { IExchangeSubscribe } from "../../../common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "../../../common/enum";
import { WebSocketClient } from "../../../common/websocket";
import { converter } from "./bithumb.subscribe.converter";
import { BithumbPublic } from "../public/bithumb.public";
import { constants } from "../../bithumb.constant";

export class BithumbSubscribe extends BithumbPublic implements IExchangeSubscribe {
  constructor(connectKey?: string, secretKey?: string) {
    super(connectKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string) {
    let type = null;
    let convert = null;

    switch (subscribe) {
      case subscribeType.ticker:
        type = constants.subscribeType.ticker;
        convert = converter.subscribeTicker;
        break;
      case subscribeType.transaction:
        type = constants.subscribeType.transaction;
        convert = converter.subscribeTransaction;
        break;
      case subscribeType.orderbook:
        type = constants.subscribeType.orderbook;
        convert = converter.subscribeOrderbook;
        break;
    }

    const data = {
      type: type,
      symbols: [`${currency}_${unit}`],
    };

    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!);
    return ws;
  }
}
