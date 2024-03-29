import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositHistory,
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeOrderHistory,
  ExchangeWithdrawHistory,
  WithdrawState,
} from "@exchange/exchange.interface";
import {
  BithumbBalance,
  BithumbDepositAddress,
  BithumbDepositHistory,
  BithumbOrderHistory,
  BithumbTicker,
  BithumbWithdrawHistory,
} from "@bithumb/bithumb.interface";
import { toBigNumberString } from "@utils/number";

export const marketConverter = (data: BithumbTicker[], unit: string): ExchangeMarket[] => {
  return Object.keys(data).map((currency) => {
    return {
      currency,
      unit,
    };
  });
};

export const marketPriceConverter = (data: BithumbTicker[], unit: string): ExchangeMarketPrice[] => {
  return Object.keys(data).map((currency) => {
    return {
      currency,
      unit,
      price: toBigNumberString(data[currency].closing_price),
    };
  });
};

export const balanceConverter = (data: BithumbBalance[]): ExchangeBalance[] => {
  const result: ExchangeBalance[] = [];

  Object.keys(data).forEach((key) => {
    if (key.startsWith("total_")) {
      const balance = data[key];
      if (parseFloat(balance) > 0) {
        const [, currency] = key.split("_");
        result.push({
          currency: currency.toUpperCase(),
          balance: toBigNumberString(balance),
        });
      }
    }
  });
  return result;
};

export const depositAddressesConverter = (data: BithumbDepositAddress): ExchangeDepositAddress => {
  return {
    currency: data.currency,
    network: data.net_type,
    address: data.wallet_address,
    memo: null,
  };
};

export const depositHistoryConverter = (data: BithumbDepositHistory[]): ExchangeDepositHistory[] => {
  return data.map(({}) => {
    return {
      type: "deposit",
      txId: "",
      currency: "",
      amount: "",
      fee: "",
      state: "",
      createdAt: "",
      confirmedAt: "",
    };
  });
};

export const withdrawHistoryConverter = (data: BithumbWithdrawHistory[]): ExchangeWithdrawHistory[] => {
  return data.map(({ order_currency, fee, amount, transfer_date }) => {
    return {
      type: "withdraw",
      txId: "",
      currency: order_currency,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state: WithdrawState.DONE.toString(),
      createdAt: new Date(transfer_date).toISOString().replace(/T/, " ").replace(/\..+/, ""),
      confirmedAt: "",
    };
  });
};

export const orderHistoryConverter = (data: BithumbOrderHistory[]): ExchangeOrderHistory[] => {
  return data.map(({ order_currency, payment_currency, order_date, type, price, units }) => {
    return {
      currency: order_currency,
      unit: payment_currency,
      price: toBigNumberString(price),
      amount: toBigNumberString(units),
      side: type,
      fee: null,
      createdAt: new Date(order_date).toISOString().replace(/T/, " ").replace(/\..+/, ""),
    };
  });
};
