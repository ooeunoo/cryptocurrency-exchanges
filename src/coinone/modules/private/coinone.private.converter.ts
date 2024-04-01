import { depositWithdrawType, depsoitWithdrawState } from "../../../common/enum";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivateConverter,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { add, isGreaterThan, toBigNumberString } from "../../../utils/number";
import {
  ICoinoneBalance,
  ICoinoneDepositAddress,
  ICoinoneDepositHistory,
  ICoinoneWalletStatus,
  ICoinoneWithdrawHistory,
} from "./coinone.private.interface";

export const converter: IExchangePrivateConverter = {
  walletStatus: function (res: ICoinoneWalletStatus): IWalletStatus[] {
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
  },
  balance: function (res: ICoinoneBalance): IBalance[] {
    const data = res.balances;
    const results: IBalance[] = [];
    data.forEach(({ currency, available, limit, average_price }) => {
      if (isGreaterThan(add(available, limit), 0)) {
        results.push({
          currency: currency.toUpperCase(),
          balance: toBigNumberString(available),
          lockedBalance: toBigNumberString(limit),
          avgBuyPrice: toBigNumberString(average_price),
        });
      }
    });

    return results;
  },
  depositAddress: function (res: ICoinoneDepositAddress): IDepositAddress[] {
    const data = res.walletAddress;
    const results: IDepositAddress[] = [];

    for (const currency in data) {
      if (data[currency] == null) continue;

      if (currency.includes("_")) {
        const baseCurrency = currency.split("_")[0];
        const property = currency.split("_")[1];

        const existingEntry = results.find((entry) => entry.currency === baseCurrency);
        if (existingEntry) {
          existingEntry["memo"] = data[currency];
        } else {
          const newEntry: any = { currency: baseCurrency, network: null };
          newEntry.memo = data[currency];
          results.push(newEntry);
        }
      } else {
        const entry = { currency: currency.toUpperCase(), network: null, address: data[currency], memo: null };
        results.push(entry);
      }
    }

    return results;
  },
  depositHistory: function (res: ICoinoneDepositHistory): IDepositWithdrawHistory[] {
    const data = res.transactions;

    const convertState = (state: string) => {
      switch (state) {
        case "DEPOSIT_WAIT":
          return depsoitWithdrawState.waiting;
        case "DEPOSIT_SUCCESS":
          return depsoitWithdrawState.accepted;
        case "DEPOSIT_FAIL":
          return depsoitWithdrawState.failed;
        case "DEPOSIT_REFUND":
          return depsoitWithdrawState.refunded;
        case "DEPOSIT_REJECT":
          return depsoitWithdrawState.rejected;
        default:
          return depsoitWithdrawState.unknown;
      }
    };

    return data.map(({ txid, currency, from_address, from_secondary_address, to_address, to_secondary_address, amount, fee, status, created_at }) => {
      return {
        type: depositWithdrawType.deposit,
        txId: txid,
        currency: currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: convertState(status), //
        fromAddress: from_address,
        fromAddressTag: from_secondary_address,
        toAddress: to_address,
        toAddressTag: to_secondary_address,
        createdAt: created_at,
        confirmedAt: null,
      };
    });
  },
  withdrawHistory: function (res: ICoinoneWithdrawHistory): IDepositWithdrawHistory[] {
    const data = res.transactions;

    const convertState = (state: string) => {
      switch (state) {
        case "WITHDRAWAL_REGISTER":
          return depsoitWithdrawState.waiting;
        case "WITHDRAWAL_WAIT":
          return depsoitWithdrawState.processing;
        case "WITHDRAWAL_SUCCESS":
          return depsoitWithdrawState.accepted;
        case "WITHDRAWAL_FAIL":
          return depsoitWithdrawState.failed;
        case "WITHDRAWAL_REFUND":
          return depsoitWithdrawState.refunded;
        case "WITHDRAWAL_REFUND_FAIL":
          return depsoitWithdrawState.refundFailed;
        default:
          return depsoitWithdrawState.unknown;
      }
    };

    return data.map(({ txid, currency, from_address, from_secondary_address, to_address, to_secondary_address, amount, fee, status, created_at }) => {
      return {
        type: depositWithdrawType.withdraw,
        txId: txid,
        currency: currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: convertState(status), //
        fromAddress: from_address,
        fromAddressTag: from_secondary_address,
        toAddress: to_address,
        toAddressTag: to_secondary_address,
        createdAt: created_at,
        confirmedAt: null,
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
