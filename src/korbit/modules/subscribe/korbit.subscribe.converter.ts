import { orderSide, tickerChange } from "../../../common/enum";
import {
  IExchangeSubscribeConverter,
  ISubscribeOrderbook,
  ISubscribeTicker,
  ISubscribeTransaction,
} from "../../../common/interfaces/exchange.subscribe.interface";
import { isGreaterThan, isZero, toBigNumberString } from "../../../utils/number";
import { IKorbitSubscribeOrderbook, IKorbitSubscribeTicker, IKorbitSubscribeTransaction } from "./korbit.subscribe.interface";

export const converter: IExchangeSubscribeConverter = {
  subscribeTicker: function (res: IKorbitSubscribeTicker): ISubscribeTicker | null {
    if (res.event != "korbit:push-ticker") return null;

    const data = res.data;
    const [currency, unit] = data.currency_pair.split("_");
    const change = isGreaterThan(data.change, 0) ? tickerChange.rise : isZero(data.change) ? tickerChange.even : tickerChange.fall;
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      high: toBigNumberString(data.high),
      low: toBigNumberString(data.low),
      first: toBigNumberString(data.open),
      last: toBigNumberString(data.last),
      change,
      accTradeVolume: null,
      accTradeVolume24h: null,
      accTradePrice: null,
      accTradePrice24h: null,
      timestamp: data.timestamp,
    };
  },
  subscribeTransaction: function (res: IKorbitSubscribeTransaction): ISubscribeTransaction | null {
    if (res.event != "korbit:push-transaction") return null;

    const data = res.data;
    const [currency, unit] = data.currency_pair.split("_");
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      price: toBigNumberString(data.price),
      amount: toBigNumberString(data.amount),
      side: data.taker == "buy" ? orderSide.ask : orderSide.bid,
      timestamp: data.timestamp,
    };
  },
  subscribeOrderbook: function (res: IKorbitSubscribeOrderbook): ISubscribeOrderbook | null {
    if (res.event != "korbit:push-orderbook") return null;

    const data = res.data;
    const [currency, unit] = data.currency_pair.split("_");
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      orderbooks: {
        ask: data.asks,
        bid: data.bids,
      },
      timestamp: data.timestamp,
    };
  },
};
