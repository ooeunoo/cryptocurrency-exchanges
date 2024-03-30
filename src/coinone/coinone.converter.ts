import { ExchangeBalance, ExchangeTicker, ExchangeWalletStatus } from "@exchange/exchange.interface";
import { CoinoneBalance, CoinoneTicker, CoinoneWalletStatus } from "./coinone.interface";
import { add, isGreaterThan, toBigNumberString } from "@utils/number";

export const coinoneTickerConverter = (res: CoinoneTicker): ExchangeTicker[] => {
  const data = res.tickers;
  return data.map(({ quote_currency, target_currency, high, low, first, last }) => {
    return {
      currency: target_currency.toUpperCase(),
      unit: quote_currency.toUpperCase(),
      high: toBigNumberString(high),
      low: toBigNumberString(low),
      first: toBigNumberString(first),
      last: toBigNumberString(last),
    };
  });
};

export const coinoneWalletStatusConvereter = (res: CoinoneWalletStatus): ExchangeWalletStatus[] => {
  const data = res.currencies;
  return data.map(({ symbol, deposit_status, withdraw_status, withdrawal_fee, withdrawal_min_amount }) => {
    return {
      currency: symbol.toUpperCase(),
      network: null,
      deposit: deposit_status == "normal",
      withdraw: withdraw_status == "normal",
      withdrawFee: toBigNumberString(withdrawal_fee),
      withdrawMin: toBigNumberString(withdrawal_min_amount),
    };
  });
};

export const coinoneBalanceConverter = (res: CoinoneBalance): ExchangeBalance[] => {
  const data = res.balances;
  const result: ExchangeBalance[] = [];
  data.forEach(({ currency, available, limit, average_price }) => {
    if (isGreaterThan(add(available, limit), 0)) {
      result.push({
        currency: currency.toUpperCase(),
        balance: toBigNumberString(available),
        lockedBalance: toBigNumberString(limit),
        avgBuyPrice: toBigNumberString(average_price),
      });
    }
  });

  return result;
};
