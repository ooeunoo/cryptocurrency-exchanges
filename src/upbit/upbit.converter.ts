import { toBigNumberString } from "@utils/number";
import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositHistory,
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeOrderHistory,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import {
  UpbitBalance,
  UpbitDepositAddress,
  UpbitDepositHistory,
  UpbitMarket,
  UpbitMarketPrice,
  UpbitOrderHistory,
  UpbitWithdrawHistory,
} from "@upbit/upbit.interface";

export const marketConverter = (data: UpbitMarket[]): ExchangeMarket[] => {
  return data.map(({ market }) => {
    const [unit, currency] = market.split("-");
    return {
      currency,
      unit,
    };
  });
};

export const marketPriceConverter = (data: UpbitMarketPrice[]): ExchangeMarketPrice[] => {
  return data.map(({ market, trade_price }) => {
    const [unit, currency] = market.split("-");
    return {
      currency,
      unit,
      price: toBigNumberString(trade_price),
    };
  });
};

export const balanceConverter = (data: UpbitBalance[]): ExchangeBalance[] => {
  return data.map(({ currency, balance, locked, avg_buy_price }) => {
    return {
      currency,
      balance: toBigNumberString(balance),
      lockedBalance: toBigNumberString(locked),
      avgBuyPrice: toBigNumberString(avg_buy_price),
    };
  });
};

export const depositAddressesConverter = (data: UpbitDepositAddress): ExchangeDepositAddress => {
  return {
    currency: data.currency,
    network: data.net_type,
    address: data.deposit_address,
    memo: data.secondary_address,
  };
};

export const depositHistoryConverter = (data: UpbitDepositHistory[]): ExchangeDepositHistory[] => {
  console.log(data);
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: "deposit",
      txId: txid,
      currency,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state,
      createdAt: created_at,
      confirmedAt: done_at,
    };
  });
};

export const withdrawHistoryConverter = (data: UpbitWithdrawHistory[]): ExchangeWithdrawHistory[] => {
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: "withdraw",
      txId: txid,
      currency,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state,
      createdAt: created_at,
      confirmedAt: done_at,
    };
  });
};

export const orderHistoryConverter = (data: UpbitOrderHistory[]): ExchangeOrderHistory[] => {
  return data.map(({ market, price, side, created_at, volume, paid_fee }) => {
    const [unit, currency] = market.split("-");
    return {
      currency,
      unit,
      side,
      price: toBigNumberString(price),
      amount: toBigNumberString(volume),
      fee: toBigNumberString(paid_fee),
      createdAt: created_at,
    };
  });
};
