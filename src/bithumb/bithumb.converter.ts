import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IMarket,
  IMarketPrice,
  IOrderHistory,
  ITicker,
  IWalletStatus,
} from "@exchange/exchange.interface";
import {
  IBithumbBalance,
  IBithumbDepositAddress,
  IBithumbDepositHistory,
  IBithumbOrderHistory,
  IBithumbTicker,
  IBithumbWalletStatus,
  IBithumbWithdrawHistory,
  IBithumbResponse,
} from "@bithumb/bithumb.interface";
import { sub, toBigNumberString } from "@utils/number";
import { depositWithdrawType, depsoitWithdrawState, orderSide } from "@exchange/exchange.enum";

export const bithumbMarketTickerConverterKRW = (res: IBithumbResponse<IBithumbTicker[]>): ITicker[] => {
  const data = res.data;
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
};

export const bithumbMarketTickerConverterBTC = (res: IBithumbResponse<IBithumbTicker[]>): ITicker[] => {
  const data = res.data;
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
};

export const bithumbWalletStatusConverter = (data: IBithumbResponse<IBithumbWalletStatus[]>): IWalletStatus[] => {
  const pdata = data.data;
  return pdata.map(({ currency, net_type, deposit_status, withdrawal_status }) => {
    return {
      currency: currency.toUpperCase(),
      network: net_type.toUpperCase(),
      deposit: deposit_status == 1,
      withdraw: withdrawal_status == 1,
    };
  });
};

export const bithumbBalanceConverter = (data: IBithumbResponse<IBithumbBalance[]>): IBalance[] => {
  const pdata = data.data;
  const result: IBalance[] = [];
  Object.keys(pdata).forEach((key) => {
    if (key.startsWith("total_")) {
      const balance = pdata[key];
      if (parseFloat(balance) > 0) {
        const [, currency] = key.split("_");
        const lockedBalance = pdata[`in_use_${currency}`];
        result.push({
          currency: currency.toUpperCase(),
          balance: toBigNumberString(balance),
          lockedBalance: toBigNumberString(lockedBalance),
          avgBuyPrice: null,
        });
      }
    }
  });
  return result;
};

export const bithumbDepositAddressesConverter = (data: IBithumbResponse<IBithumbDepositAddress>): IDepositAddress => {
  const pdata = data.data;

  let address = pdata.wallet_address;
  let memo = null;

  const [wallet_address, destination_tag] = pdata.wallet_address.split("&");
  if (destination_tag != undefined) {
    address = wallet_address;
    memo = destination_tag.split("=")[1];
  }

  return {
    currency: pdata.currency,
    network: pdata.net_type,
    address,
    memo: memo,
  };
};

export const bithumbDepositHistoryConverter = (data: IBithumbResponse<IBithumbDepositHistory[]>): IDepositWithdrawHistory[] => {
  const pdata = data.data;
  console.log(data);
  return pdata.map(({ order_currency, fee, amount, transfer_date }) => {
    return {
      type: depositWithdrawType.deposit,
      txId: null,
      currency: order_currency.toUpperCase(),
      network: null,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state: depsoitWithdrawState.accepted,
      fromAddress: null,
      fromAddressTag: null,
      toAddress: null,
      toAddressTag: null,
      createdAt: transfer_date,
      confirmedAt: null,
    };
  });
};

export const bithumbWithdrawHistoryConverter = (data: IBithumbResponse<IBithumbWithdrawHistory[]>): IDepositWithdrawHistory[] => {
  const pdata = data.data;

  return pdata.map(({ order_currency, fee, amount, transfer_date }) => {
    return {
      type: depositWithdrawType.withdraw,
      txId: null,
      currency: order_currency.toUpperCase(),
      network: null,
      amount: toBigNumberString(amount),
      fee: toBigNumberString(fee),
      state: depsoitWithdrawState.accepted,
      fromAddress: null,
      fromAddressTag: null,
      toAddress: null,
      toAddressTag: null,
      createdAt: transfer_date,
      confirmedAt: null,
    };
  });
};

export const bithumbOrderHistoryConverter = (data: IBithumbResponse<IBithumbOrderHistory[]>): IOrderHistory[] => {
  const pdata = data.data;

  return pdata.map(({ order_id, order_currency, payment_currency, order_date, type, price, units, units_remaining }) => {
    return {
      id: order_id,
      type: null,
      side: type == "bid" ? orderSide.bid : orderSide.ask,
      state: null,
      currency: order_currency.toUpperCase(),
      unit: payment_currency.toUpperCase(),
      price: toBigNumberString(price),
      orderAmount: toBigNumberString(units),
      excutedAmount: sub(units, units_remaining).toString(),
      fee: null,
      createdAt: parseInt(order_date),
    };
  });
};
