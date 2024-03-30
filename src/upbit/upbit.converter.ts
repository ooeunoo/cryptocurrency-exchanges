import { toBigNumberString } from "@utils/number";
import {
  DepositWithdrawalType,
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositHistory,
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeOrderHistory,
  ExchangeTicker,
  ExchangeWalletStatus,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import {
  UpbitBalance,
  UpbitDepositAddress,
  UpbitDepositHistory,
  UpbitOrderHistory,
  UpbitTicker,
  UpbitWalletStatus,
  UpbitWithdrawHistory,
} from "@upbit/upbit.interface";
import { toTimestamp } from "@utils/time";

export const upbitTickerConverter = (data: UpbitTicker[]): ExchangeTicker[] => {
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
};

export const upbitWalletStatusConverter = (data: UpbitWalletStatus[]): ExchangeWalletStatus[] => {
  return data.map(({ currency, wallet_state, net_type }) => {
    let deposit = false;
    let withdraw = false;

    switch (wallet_state) {
      case "working":
        deposit = true;
        withdraw = true;
        break;
      case "withdraw_only":
        withdraw = true;
        break;
      case "deposit_only":
        deposit = true;
        break;
      case "paused":
      case "unsupported":
        break;
    }

    return {
      currency: currency.toUpperCase(),
      network: net_type.toUpperCase(),
      deposit,
      withdraw,
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

export const depositAddressesConverter = (data: UpbitDepositAddress[]): ExchangeDepositAddress[] => {
  return data.map(({ currency, net_type, deposit_address, secondary_address }) => {
    return {
      currency: currency.toUpperCase(),
      network: net_type.toUpperCase(),
      address: deposit_address,
      memo: secondary_address ?? null,
    };
  });
};

export const depositHistoryConverter = (data: UpbitDepositHistory[]): ExchangeDepositHistory[] => {
  console.log(data);
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: DepositWithdrawalType.DEPOSIT,
      txId: txid,
      currency,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
    };
  });
};

export const withdrawHistoryConverter = (data: UpbitWithdrawHistory[]): ExchangeWithdrawHistory[] => {
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: DepositWithdrawalType.WITHDRAWAL,
      txId: txid,
      currency,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
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
      createdAt: toTimestamp(created_at),
    };
  });
};
