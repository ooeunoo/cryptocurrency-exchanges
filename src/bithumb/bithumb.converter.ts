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
  IBithumbResponse,
} from "@bithumb/bithumb.interface";
import { toBigNumberString } from "@utils/number";

export const marketConverterKRW = (data: IBithumbResponse<BithumbTicker[]>): ExchangeMarket[] => {
  const pdata = data.data;
  delete pdata["date"];
  return Object.keys(pdata).map((currency) => {
    return {
      currency,
      unit: "KRW",
    };
  });
};

export const marketConverterBTC = (data: IBithumbResponse<BithumbTicker[]>): ExchangeMarket[] => {
  const pdata = data.data;
  delete pdata["date"];
  return Object.keys(pdata).map((currency) => {
    return {
      currency,
      unit: "BTC",
    };
  });
};

export const marketPriceConverterKRW = (data: IBithumbResponse<BithumbTicker[]>): ExchangeMarketPrice[] => {
  const pdata = data.data;
  delete pdata["date"];
  return Object.keys(pdata).map((currency) => {
    return {
      currency,
      unit: "KRW",
      price: toBigNumberString(pdata[currency].closing_price),
    };
  });
};

export const marketPriceConverterBTC = (data: IBithumbResponse<BithumbTicker[]>): ExchangeMarketPrice[] => {
  const pdata = data.data;
  delete pdata["date"];
  return Object.keys(pdata).map((currency) => {
    return {
      currency,
      unit: "BTC",
      price: toBigNumberString(pdata[currency].closing_price),
    };
  });
};
export const balanceConverter = (data: IBithumbResponse<BithumbBalance[]>): ExchangeBalance[] => {
  const pdata = data.data;

  const result: ExchangeBalance[] = [];

  Object.keys(pdata).forEach((key) => {
    if (key.startsWith("total_")) {
      const balance = pdata[key];
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

export const depositAddressesConverter = (data: IBithumbResponse<BithumbDepositAddress>): ExchangeDepositAddress => {
  const pdata = data.data;

  return {
    currency: pdata.currency,
    network: pdata.net_type,
    address: pdata.wallet_address,
    memo: null,
  };
};

export const depositHistoryConverter = (data: IBithumbResponse<BithumbDepositHistory[]>): ExchangeDepositHistory[] => {
  const pdata = data.data;

  return pdata.map(({}) => {
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

export const withdrawHistoryConverter = (data: IBithumbResponse<BithumbWithdrawHistory[]>): ExchangeWithdrawHistory[] => {
  const pdata = data.data;

  return pdata.map(({ order_currency, fee, amount, transfer_date }) => {
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

export const orderHistoryConverter = (data: IBithumbResponse<BithumbOrderHistory[]>): ExchangeOrderHistory[] => {
  const pdata = data.data;

  return pdata.map(({ order_currency, payment_currency, order_date, type, price, units }) => {
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
