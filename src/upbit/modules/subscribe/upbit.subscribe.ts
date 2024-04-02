import { v4 as uuidv4 } from "uuid";
import { IExchangeSubscribe } from "../../../common/interfaces/exchange.subscribe.interface";
import { subscribeType } from "../../../common/enum";
import { UpbitPublic } from "../public/upbit.public";
import { converter } from "./upbit.subscribe.converter";
import { WebSocketClient } from "../../../common/websocket";
import { constants } from "../../upbit.constants";

export class UpbitSubscribe extends UpbitPublic implements IExchangeSubscribe {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  async client(subscribe: subscribeType, currency: string, unit: string): Promise<WebSocketClient> {
    let type = null;
    let convert = null;
    let header = null;

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
      case subscribeType.myTransaction:
        type = constants.subscribeType.myTransaction;
        convert = converter.subscribeMyTransaction;
        header = this.header();
        break;
    }

    const data: Record<string, unknown>[] = [{ ticket: uuidv4() }, { type, codes: [`${unit}-${currency}`], isOnlyRealtime: true }];

    const ws = new WebSocketClient(constants.websocketUrl, header, data, convert!);
    return ws;
  }
}
