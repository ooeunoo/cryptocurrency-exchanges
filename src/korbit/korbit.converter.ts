import { ExchangeBalance, ExchangeDepositAddress, ExchangeMarket, ExchangeMarketPrice, ExchangeTicker } from "@exchange/exchange.interface";
import { KorbitBalance, KorbitMyAddresses, KorbitTicker } from "@korbit/koribt.interface";
import { add, toBigNumberString } from "@utils/number";

export const korbitTickerConverter = (data: KorbitTicker[]): ExchangeTicker[] => {
  return Object.keys(data).map((market) => {
    const target = data[market];
    const [currency, unit] = market.split("_");

    return {
      currency: currency.toUpperCase(),
      unit: unit.toUpperCase(),
      high: toBigNumberString(target.high),
      low: toBigNumberString(target.low),
      first: toBigNumberString(target.open),
      last: toBigNumberString(target.last),
    };
  });
};

export const balanceConverter = (data: KorbitBalance): ExchangeBalance[] => {
  return Object.keys(data).map((currency) => {
    const targetCurrency = data[currency];
    return {
      currency: currency.toUpperCase(),
      balance: toBigNumberString(targetCurrency.available),
      lockedBalance: add(targetCurrency.trade_in_use, targetCurrency.withdrawal_in_use),
      avgBuyPrice: targetCurrency.avg_price,
    };
  });
};

export const depositAddressesConverter = (data: KorbitMyAddresses): ExchangeDepositAddress[] => {
  const depositAddresses = data.deposit;
  delete depositAddresses.krw;

  return Object.keys(depositAddresses).map((currency) => {
    const targetCurrency = depositAddresses[currency];
    return {
      currency: currency.toUpperCase(),
      network: null,
      address: targetCurrency.address,
      memo: targetCurrency?.destination_tag ?? null,
    };
  });
};
