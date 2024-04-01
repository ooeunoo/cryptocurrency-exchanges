import { v4 as uuidv4 } from "uuid";
import { IExchangeSubscribe } from "@common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "@common/enum";
import { UpbitPublic } from "../public/upbit.public";
import { converter } from "./upbit.subscribe.converter";
import { WebSocketClient } from "@common/websocket";

export class UpbitSubscribe extends UpbitPublic implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string) {
    let type = null;
    let convert = null;
    let header = null;

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
      case subscribeType.myTransaction:
        type = this.subscribeType.myTransaction;
        convert = converter.subscribeMyTransaction;
        header = this.header();
        break;
    }

    const data = [{ ticket: uuidv4() }, { type, codes: `${unit}-${currency}`, isOnlyRealtime: true }];

    const ws = new WebSocketClient(this.websocketUrl, header, data, convert);
    return ws;
  }
}
