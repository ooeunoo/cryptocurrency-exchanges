import { v4 as uuidv4 } from "uuid";
import { IExchangeSubscribe } from "@common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "@common/enum";
import { WebSocketClient } from "@common/websocket";
import { KorbitPublic } from "../public/korbit.public";
import { converter } from "./korbit.subscribe.converter";
import { KorbitShared } from "../shared/korbit.shared";

export class KorbitSubscribe extends KorbitShared implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string) {
    await this.header();

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
      accessToken: this.accessToken,
      timestamp: new Date().getTime(),
      event: "korbit:subscribe",
      data: {
        channels: [`${type}:${currency.toLowerCase()}_${unit.toLowerCase()}`],
      },
    };
    console.log(data);
    const ws = new WebSocketClient(this.websocketUrl, null, data, convert);
    return ws;
  }
}
