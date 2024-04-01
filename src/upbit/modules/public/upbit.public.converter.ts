import { IMarket, ITicker } from "@common/interfaces/exchange.public.interface";
import { IUpbitMarket, IUpbitTicker } from "./upbit.public.interface";
import { toBigNumberString } from "@utils/number";

export const converter = {
  markets: (data: IUpbitMarket[]): IMarket[] => {
    return data.map(({ market }) => {
      const [unit, currency] = market.split("-");
      return {
        currency: currency.toUpperCase(),
        unit: unit.toUpperCase(),
      };
    });
  },
  tickers: (data: IUpbitTicker[]): ITicker[] => {
    return data.map(({ market, opening_price, high_price, low_price, trade_price }) => {
      const [unit, currency] = market.split("-");

      return {
        currency: currency.toUpperCase(),
        unit: unit.toUpperCase(),
        high: toBigNumberString(high_price),
        low: toBigNumberString(low_price),
        first: toBigNumberString(opening_price),
        last: toBigNumberString(trade_price),
      };
    });
  },
};
