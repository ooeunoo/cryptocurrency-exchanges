import { Market } from "src/interface/market";
import { BithumbBalance, BithumbDepositAddress, BithumbDepositHistory, BithumbTicker } from "./bithumb.interface";
import { Balance } from "../interface/balance";
import { DepositAddress } from "src/interface/depositAddress";
import { DepositHistory } from "src/interface/depositHistory";

export const marketConverter = (data: BithumbTicker[], unit: string): Market[] => {
  return Object.keys(data).map((currency) => {
    return {
      currency,
      unit,
    } as Market;
  });
};

export const balanceConverter = (data: BithumbBalance[]): Balance[] => {
  const result: Balance[] = [];

  Object.keys(data).forEach((key) => {
    if (key.startsWith("total_")) {
      const balance = data[key];
      if (parseFloat(balance) > 0) {
        const [, currency] = key.split("_");
        result.push({
          currency: currency.toUpperCase(),
          balance,
        });
      }
    }
  });
  return result;
};

export const depositAddressesConverter = (data: BithumbDepositAddress): DepositAddress => {
  return {
    currency: data.currency,
    network: data.net_type,
    address: data.wallet_address,
    memo: null,
  };
};

export const depositHistoryConverter = (data: BithumbDepositHistory[]): DepositHistory[] => {
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
