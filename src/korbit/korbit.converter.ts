import { depositWithdrawType, depsoitWithdrawState } from "@exchange/exchange.enum";
import { IBalance, IDepositAddress, IDepositWithdrawHistory, IMarket, IMarketPrice, ITicker } from "@exchange/exchange.interface";
import { IKorbitBalance, IKorbitHistory, IKorbitMyAddresses, IKorbitTicker } from "@korbit/koribt.interface";
import { add, isGreaterThan, toBigNumberString } from "@utils/number";

export const korbitTickerConverter = (data: IKorbitTicker[]): ITicker[] => {
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

export const korbitBalanceConverter = (data: IKorbitBalance): IBalance[] => {
  const results: IBalance[] = [];
  Object.keys(data).forEach((currency) => {
    const targetCurrency = data[currency];
    const balance = toBigNumberString(targetCurrency.available);
    const lockedBalance = add(targetCurrency.trade_in_use, targetCurrency.withdrawal_in_use).toString();

    if (isGreaterThan(add(balance, lockedBalance), 0)) {
      results.push({
        currency: currency.toUpperCase(),
        balance: toBigNumberString(targetCurrency.available),
        lockedBalance: add(targetCurrency.trade_in_use, targetCurrency.withdrawal_in_use).toString(),
        avgBuyPrice: toBigNumberString(targetCurrency.avg_price),
      });
    }
  });
  return results;
};

export const korbitDepositAddressesConverter = (data: IKorbitMyAddresses): IDepositAddress[] => {
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

export const korbitDepositHistoryConverter = (data: IKorbitHistory[]): IDepositWithdrawHistory[] => {
  const convertState = (state) => {
    switch (state) {
      case "filled":
        return depsoitWithdrawState.accepted;
      case "requested":
        return depsoitWithdrawState.processing;
      // TODO:
    }
  };

  return data.map(({ currency, amount, details, status, created_at, completed_at }) => {
    return {
      type: depositWithdrawType.deposit,
      txId: details?.transaction_id,
      currency: currency.toUpperCase(),
      network: null,
      amount: toBigNumberString(amount),
      fee: null,
      state: convertState(status),
      fromAddress: details?.address,
      fromAddressTag: details?.destination_tag,
      toAddress: null,
      toAddressTag: null,
      createdAt: created_at,
      confirmedAt: completed_at,
    };
  });
};

export const korbitWithdrawHistoryConverter = (data: IKorbitHistory[]): IDepositWithdrawHistory[] => {
  const convertState = (state) => {
    switch (state) {
      case "filled":
        return depsoitWithdrawState.accepted;
      case "requested":
        return depsoitWithdrawState.processing;
      // TODO:
    }
  };

  return data.map(({ currency, amount, details, status, created_at, completed_at }) => {
    return {
      type: depositWithdrawType.withdraw,
      txId: details?.transaction_id,
      currency: currency.toUpperCase(),
      network: null,
      amount: toBigNumberString(amount),
      fee: null,
      state: convertState(status),
      fromAddress: null,
      fromAddressTag: null,
      toAddress: details?.address,
      toAddressTag: details?.destination_tag,
      createdAt: created_at,
      confirmedAt: completed_at,
    };
  });
};
