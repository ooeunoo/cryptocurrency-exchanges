import { orderSide, tickerChange } from "../../../common/enum";
import {
  IExchangeSubscribeConverter,
  ISubscribeOrderbook,
  ISubscribeTicker,
  ISubscribeTransaction,
} from "../../../common/interfaces/exchange.subscribe.interface";
import { isGreaterThan, isZero, sub, toBigNumberString } from "../../../utils/number";
import { ICoinoneSubscribeOrderbook, ICoinoneSubscribeTicker, ICoinoneSubscribeTransaction } from "./bithumb.subscribe.interface";

export const converter: IExchangeSubscribeConverter = {
  subscribeTicker: function (res: ICoinoneSubscribeTicker): ISubscribeTicker | null {
    if (res.response_type != "DATA") return null;
    const data = res.data;

    const change = isGreaterThan(data.yesterday_last, data.last)
      ? tickerChange.rise
      : isZero(sub(data.yesterday_last, data.last))
        ? tickerChange.even
        : tickerChange.fall;

    return {
      currency: data.target_currency.toUpperCase(),
      unit: data.quote_currency.toUpperCase(),
      high: toBigNumberString(data.high),
      low: toBigNumberString(data.low),
      first: toBigNumberString(data.first),
      last: toBigNumberString(data.last),
      change,
      accTradeVolume: null,
      accTradeVolume24h: null,
      accTradePrice: null,
      accTradePrice24h: null,
      timestamp: data.timestamp,
    };
  },
  subscribeTransaction: function (res: ICoinoneSubscribeTransaction): ISubscribeTransaction {
    const data = res.data;
    return {
      currency: data.target_currency.toUpperCase(),
      unit: data.quote_currency.toUpperCase(),
      price: toBigNumberString(data.price),
      amount: toBigNumberString(data.qty),
      side: data.is_seller_maker ? orderSide.bid : orderSide.ask,
      timestamp: data.timestamp,
    };
  },
  subscribeOrderbook: function (res: ICoinoneSubscribeOrderbook): ISubscribeOrderbook {
    const data = res.data;
    return {
      currency: data.target_currency.toUpperCase(),
      unit: data.quote_currency.toUpperCase(),
      orderbooks: {
        ask: data.asks.map(({ price, qty }) => {
          return { price: toBigNumberString(price), amount: toBigNumberString(qty) };
        }),
        bid: data.bids.map(({ price, qty }) => {
          return { price: toBigNumberString(price), amount: toBigNumberString(qty) };
        }),
      },

      timestamp: data.timestamp,
    };
  },
};
