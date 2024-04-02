import { IExchangePublicConverter, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { toBigNumberString } from "../../../utils/number";
import { IBithumbMarket, IBithumbTickerData } from "./bithumb.public.interface";

export const converter: IExchangePublicConverter = {
  markets: (): IMarket[] => {
    return [];
  },
  tickers: (): ITicker[] => {
    return [];
  },
  marketskrw: (res: IBithumbMarket): IMarket[] => {
    const data: IBithumbTickerData | string = res.data;
    delete data["date"]; // string type 제거
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: "KRW" };
    });
  },
  marketsbtc: (res: IBithumbMarket): IMarket[] => {
    const data: IBithumbTickerData | string = res.data;
    delete data["date"]; // string type 제거
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: "BTC" };
    });
  },
  tickerskrw: (res: IBithumbMarket): ITicker[] => {
    const data: IBithumbTickerData | string = res.data;
    delete data["date"]; // string type 제거
    return Object.keys(data).map((currency) => {
      const target = data[currency];
      return {
        currency: currency.toUpperCase(),
        unit: "KRW",
        high: toBigNumberString(target.max_price),
        low: toBigNumberString(target.min_price),
        first: toBigNumberString(target.opening_price),
        last: toBigNumberString(target.closing_price),
      };
    });
  },
  tickersbtc: (res: IBithumbMarket): ITicker[] => {
    const data: IBithumbTickerData | string = res.data;
    delete data["date"]; // string type 제거
    return Object.keys(data).map((currency) => {
      const target = data[currency];
      return {
        currency: currency.toUpperCase(),
        unit: "BTC",
        high: toBigNumberString(target.max_price),
        low: toBigNumberString(target.min_price),
        first: toBigNumberString(target.opening_price),
        last: toBigNumberString(target.closing_price),
      };
    });
  },
};
