import { depositWithdrawType, depsoitWithdrawState } from "@common/enum";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivateConverter,
  IOrderHistory,
  IWalletStatus,
} from "@common/interfaces/exchange.private.interface";
import { add, isGreaterThan, toBigNumberString } from "@utils/number";
import { IKorbitBalance, IKorbitDepositAddress, IKorbitHistory } from "./korbit.private.interface";

export const converter: IExchangePrivateConverter = {
  walletStatus: function (data: any): IWalletStatus[] {
    throw new Error("Function not implemented.");
  },
  balance: function (data: IKorbitBalance): IBalance[] {
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
  },
  depositAddress: function (data: IKorbitDepositAddress): IDepositAddress[] {
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
  },
  depositHistory: function (data: IKorbitHistory[]): IDepositWithdrawHistory[] {
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
  },
  withdrawHistory: function (data: any): IDepositWithdrawHistory[] {
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
  },
  completedOrderHistory: function (data: any): IOrderHistory[] {
    throw new Error("Function not implemented.");
  },
  unCompletedOrderHistory: function (data: any): IOrderHistory[] {
    throw new Error("Function not implemented.");
  },
};
