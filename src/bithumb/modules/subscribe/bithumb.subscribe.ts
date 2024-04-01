import { v4 as uuidv4 } from "uuid";
import { IExchangeSubscribe } from "@common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "@common/enum";
import { WebSocketClient } from "@common/websocket";
import { converter } from "./bithumb.subscribe.converter";
import { BithumbPublic } from "../public/bithumb.public";

export class BithumbSubscribe extends BithumbPublic implements IExchangeSubscribe {
  constructor(connectKey?: string, secretKey?: string) {
    super(connectKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string) {
    let type = null;
    let convert = null;

    switch (subscribe) {
      case subscribeType.ticker:
        type = this.subscribeType.ticker;
        convert = converter.subscribeTicker;
        break;
      case subscribeType.transaction:
        type = this.subscribeType.transaction;
        convert = converter.subscribeTransaction;
        break;
      case subscribeType.orderbook:
        type = this.subscribeType.orderbook;
        convert = converter.subscribeOrderbook;
        break;
    }

    const data = {
      type: type,
      symbols: [`${currency}_${unit}`],
    };

    const ws = new WebSocketClient(this.websocketUrl, null, data, convert);
    return ws;
  }
}
