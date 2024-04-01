import { IExchangeSubscribe } from "../../../common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "../../../common/enum";
import { WebSocketClient } from "../../../common/websocket";
import { converter } from "./coinone.subscribe.converter";
import { CoinonePublic } from "../public/coinone.public";
import { constants } from "../../coinone.constants";

export class CoinoneSubscribe extends CoinonePublic implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
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
      request_type: "SUBSCRIBE",
      channel: type,
      topic: {
        quote_currency: unit,
        target_currency: currency,
      },
    };
    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!);
    return ws;
  }
}
