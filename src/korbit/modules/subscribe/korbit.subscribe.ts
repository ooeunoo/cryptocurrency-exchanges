import { IExchangeSubscribe } from "../../../common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "../../../common/enum";
import { WebSocketClient } from "../../../common/websocket";
import { converter } from "./korbit.subscribe.converter";
import { KorbitShared } from "../shared/korbit.shared";
import { constants } from "../../korbit.constants";

export class KorbitSubscribe extends KorbitShared implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string): Promise<WebSocketClient> {
    await this.header();

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
      accessToken: this.accessToken,
      timestamp: new Date().getTime(),
      event: "korbit:subscribe",
      data: {
        channels: [`${type}:${currency.toLowerCase()}_${unit.toLowerCase()}`],
      },
    };
    const ws = new WebSocketClient(constants.websocketUrl, null, data, convert!);
    return ws;
  }
}
