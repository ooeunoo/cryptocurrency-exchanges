import { ExchangeMarket, ExchangeMarketPrice } from "@exchange/exchange.interface";
import { KorbitTicker } from "@korbit/koribt.interface";
import { toBigNumberString } from "@utils/number";

export const marketConverter = (data: KorbitTicker[]): ExchangeMarket[] => {
  return Object.keys(data).map((market) => {
    const [currency, unit] = market.split("_");
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
    };
  });
};

export const marketPriceConverter = (data: KorbitTicker[]): ExchangeMarketPrice[] => {
  return Object.keys(data).map((market) => {
    const [currency, unit] = market.split("_");
    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      price: toBigNumberString(data[market].last),
    };
  });
};
