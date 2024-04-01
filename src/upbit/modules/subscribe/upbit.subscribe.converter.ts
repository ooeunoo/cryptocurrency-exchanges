import {
  ISubscribeTransaction,
  ISubscribeTicker,
  ISubscribeOrderbook,
  ISubscribeMyTransaction,
} from "@common/interfaces/exchange.subscribe.interface";
import {
  IUpbitSubscribeTransaction,
  IUpbitSubscribeTicker,
  IUpbitSubscribeOrderbook,
  IUpbitSubscribeMyTransaction,
} from "./upbit.subscribe.interface";
import { orderSide, tickerChange } from "@common/enum";
import { toBigNumberString } from "@utils/number";

export const converter = {
  subscribeTicker: (data: IUpbitSubscribeTicker): ISubscribeTicker => {
    const [unit, currency] = data.code.split("-");
    const convertChange = (change) => {
      switch (change) {
        case "FALL":
          return tickerChange.fall;
        case "RISE":
          return tickerChange.rise;
        case "EVEN":
          return tickerChange.even;
        default:
          return null;
      }
    };
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      high: toBigNumberString(data.high_price),
      low: toBigNumberString(data.low_price),
      first: toBigNumberString(data.opening_price),
      last: toBigNumberString(data.trade_price),
      change: convertChange(data.change),
      accTradeVolume: toBigNumberString(data.acc_trade_volume),
      accTradeVolume24h: toBigNumberString(data.acc_trade_price_24h),
      accTradePrice: toBigNumberString(data.acc_trade_price),
      accTradePrice24h: toBigNumberString(data.acc_trade_price_24h),
      timestamp: data.timestamp,
    };
  },
  subscribeTransaction: (data: IUpbitSubscribeTransaction): ISubscribeTransaction => {
    const [unit, currency] = data.code.split("-");
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      price: toBigNumberString(data.trade_price),
      amount: toBigNumberString(data.trade_volume),
      side: data.ask_bid == "ASK" ? orderSide.ask : orderSide.bid,
      timestamp: data.trade_timestamp,
    };
  },
  subscribeOrderbook: (data: IUpbitSubscribeOrderbook): ISubscribeOrderbook => {
    const [unit, currency] = data.code.split("-");
    const orderbooks = {
      ask: [],
      bid: [],
    };

    data.orderbook_units.map(({ ask_price, bid_price, ask_size, bid_size }) => {
      orderbooks.ask.push({ price: ask_price, amount: ask_size });
      orderbooks.bid.push({ price: bid_price, amount: bid_size });
    });

    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      orderbooks,
      timestamp: data.timestamp,
    };
  },
  subscribeMyTransaction: (data: IUpbitSubscribeMyTransaction): ISubscribeMyTransaction => {
    const [unit, currency] = data.code.split("-");

    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      side: data.ask_bid == "ASK" ? orderSide.ask : orderSide.bid,
      price: toBigNumberString(data.price),
      amount: toBigNumberString(data.volume),
      timestamp: data.trade_timestamp,
    };
  },
};
