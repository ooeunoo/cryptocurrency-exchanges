import { IExchangePublicConverter, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { toBigNumberString } from "../../../utils/number";
import { IBithumbMarket } from "./bithumb.public.interface";

export const converter: IExchangePublicConverter = {
  markets: (data: any): any => {
    return [];
  },
  tickers: (data: any): any => {},
  marketskrw: (res: IBithumbMarket): IMarket[] => {
    const data: any = res.data;
    delete data["date"];
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: "KRW" };
    });
  },
  marketsbtc: (res: IBithumbMarket): IMarket[] => {
    const data: any = res.data;
    delete data["date"];
    return Object.keys(data).map((currency) => {
      return { currency: currency.toUpperCase(), unit: "BTC" };
    });
  },
  tickerskrw: (res: IBithumbMarket): ITicker[] => {
    const data: any = res.data;
    delete data["date"];
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
    const data: any = res.data;
    delete data["date"];
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
