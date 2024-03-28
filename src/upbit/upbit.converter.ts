import { Market } from "src/interface/market";
import { UpbitBalance, UpbitDepositAddress, UpbitDepositHistory, UpbitMarket, UpbitOrderHistory, UpbitWithdrawHistory } from "./upbit.interface";
import { Balance } from "src/interface/balance";
import { DepositAddress } from "src/interface/depositAddress";
import { DepositHistory } from "src/interface/depositHistory";
import { WithdrawHistory } from "src/interface/withdrawHistory";
import { OrderHistory } from "src/interface/orderHistory";

export const marketConverter = (data: UpbitMarket[]): Market[] => {
  return data.map(({ market }) => {
    const [unit, currency] = market.split("-");
    return {
      currency,
      unit,
    } as Market;
  });
};

export const balanceConverter = (data: UpbitBalance[]): Balance[] => {
  return data.map(({ currency, balance }) => {
    return {
      currency,
      balance,
    } as Balance;
  });
};

export const depositAddressesConverter = (data: UpbitDepositAddress): DepositAddress => {
  return {
    currency: data.currency,
    network: data.net_type,
    address: data.deposit_address,
    memo: data.secondary_address,
  };
};

export const depositHistoryConverter = (data: UpbitDepositHistory[]): DepositHistory[] => {
  console.log(data);
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: "deposit",
      txId: txid,
      currency,
      amount,
      fee,
      state,
      createdAt: created_at,
      confirmedAt: done_at,
    } as DepositHistory;
  });
};

export const withdrawHistoryConverter = (data: UpbitWithdrawHistory[]): WithdrawHistory[] => {
  return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
    return {
      type: "withdraw",
      txId: txid,
      currency,
      amount,
      fee,
      state,
      createdAt: created_at,
      confirmedAt: done_at,
    } as WithdrawHistory;
  });
};

export const orderHistoryConverter = (data: UpbitOrderHistory[]): OrderHistory[] => {
  return data.map(({ market, price, created_at, volume, paid_fee }) => {
    const [unit, currency] = market.split("-");
    return {
      currency,
      unit,
      price,
      amount: volume,
      fee: paid_fee,
      createdAt: created_at,
    } as OrderHistory;
  });
};
