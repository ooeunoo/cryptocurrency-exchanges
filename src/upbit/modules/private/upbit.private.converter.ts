import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { toBigNumberString } from "../../../utils/number";
import {
  IUpbitBalance,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitOrderHistory,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from "./upbit.private.interface";
import { depositWithdrawType, depsoitWithdrawState, orderSide, orderState, orderType } from "../../../common/enum";
import { toTimestamp } from "../../../utils/time";

export const converter = {
  walletStatus: (data: IUpbitWalletStatus[]): IWalletStatus[] => {
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
        withdrawFee: null,
        withdrawMin: null,
      };
    });
  },
  balance: (data: IUpbitBalance[]): IBalance[] => {
    return data.map(({ currency, balance, locked, avg_buy_price }) => {
      return {
        currency,
        balance: toBigNumberString(balance),
        lockedBalance: toBigNumberString(locked),
        avgBuyPrice: toBigNumberString(avg_buy_price),
      };
    });
  },
  depositAddress: (data: IUpbitDepositAddress[]): IDepositAddress[] => {
    return data.map(({ currency, net_type, deposit_address, secondary_address }) => {
      return {
        currency: currency.toUpperCase(),
        network: net_type.toUpperCase(),
        address: deposit_address,
        memo: secondary_address ?? null,
      };
    });
  },
  depositHistory: (data: IUpbitDepositHistory[]): IDepositWithdrawHistory[] => {
    const convertState = (state: string) => {
      switch (state) {
        case "PROCESSING":
          return depsoitWithdrawState.processing;
        case "ACCEPTED":
          return depsoitWithdrawState.accepted;
        case "CANCELLED":
          return depsoitWithdrawState.canceled;
        case "REJECTED":
          return depsoitWithdrawState.rejected;
        case "TRAVEL_RULE_SUSPECTED":
          return depsoitWithdrawState.travelRuleSuspected;
        case "REFUNDING":
          return depsoitWithdrawState.refunded;
        case "REFUNDED":
          return depsoitWithdrawState.refunded;
        default:
          return depsoitWithdrawState.unknown;
      }
    };
    return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
      return {
        type: depositWithdrawType.deposit,
        txId: txid,
        currency: currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: convertState(state),
        fromAddress: null,
        fromAddressTag: null,
        toAddress: null,
        toAddressTag: null,
        createdAt: toTimestamp(created_at),
        confirmedAt: toTimestamp(done_at),
      };
    });
  },
  withdrawHistory: (data: IUpbitWithdrawHistory[]): IDepositWithdrawHistory[] => {
    const convertState = (state: string) => {
      switch (state) {
        case "WAITING": // 입금진행
          return depsoitWithdrawState.waiting;
        case "PROCESSING":
          return depsoitWithdrawState.processing;
        case "DONE":
          return depsoitWithdrawState.accepted;
        case "FAILED":
          return depsoitWithdrawState.failed;
        case "CANCELLED":
          return depsoitWithdrawState.canceled;
        case "REJECTED":
          return depsoitWithdrawState.rejected;
        default:
          return depsoitWithdrawState.unknown;
      }
    };
    return data.map(({ currency, txid, state, created_at, done_at, amount, fee }) => {
      return {
        type: depositWithdrawType.withdraw,
        txId: txid,
        currency: currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: convertState(state),
        fromAddress: null,
        fromAddressTag: null,
        toAddress: null,
        toAddressTag: null,
        createdAt: toTimestamp(created_at),
        confirmedAt: toTimestamp(done_at),
      };
    });
  },
  completedOrderHistory: (data: IUpbitOrderHistory[]): IOrderHistory[] => {
    const convertorderType = (type: string) => {
      switch (type) {
        case "limit":
          return orderType.limit;
        case "price":
        case "market":
          return orderType.market;
        case "best":
          return orderType.best;
        case "stop_limit":
          return orderType.stop_limit;
        default:
          return orderType.unknown;
      }
    };
    const convertState = (state: string) => {
      switch (state) {
        case "wait":
          return orderState.undone;
        case "watch":
          return orderState.undone;
        case "done":
          return orderState.done;
        case "cancel":
          return orderState.done;
        default:
          return orderState.unknown;
      }
    };
    return data.map(({ uuid, market, ord_type, price, side, volume, executed_volume, state, created_at, paid_fee }) => {
      const [unit, currency] = market.split("-");
      return {
        id: uuid,
        type: convertorderType(ord_type),
        side: side == "ask" ? orderSide.ask : orderSide.bid,
        state: convertState(state),
        currency: currency.toUpperCase(),
        unit,
        price: toBigNumberString(price),
        orderAmount: toBigNumberString(volume),
        excutedAmount: toBigNumberString(executed_volume),
        fee: toBigNumberString(paid_fee),
        createdAt: toTimestamp(created_at),
      };
    });
  },
  unCompletedOrderHistory: (data: IUpbitOrderHistory[]): IOrderHistory[] => {
    const convertorderType = (type: string) => {
      switch (type) {
        case "limit":
          return orderType.limit;
        case "price":
        case "market":
          return orderType.market;
        case "best":
          return orderType.best;
        case "stop_limit":
          return orderType.stop_limit;
        default:
          return orderType.unknown;
      }
    };
    const convertState = (state: string) => {
      switch (state) {
        case "wait":
          return orderState.undone;
        case "watch":
          return orderState.undone;
        case "done":
          return orderState.done;
        case "cancel":
          return orderState.done;
        default:
          return orderState.unknown;
      }
    };
    return data.map(({ uuid, market, ord_type, price, side, volume, executed_volume, state, created_at, paid_fee }) => {
      const [unit, currency] = market.split("-");
      return {
        id: uuid,
        type: convertorderType(ord_type),
        side: side == "ask" ? orderSide.ask : orderSide.bid,
        state: convertState(state),
        currency: currency.toUpperCase(),
        unit,
        price: toBigNumberString(price),
        orderAmount: toBigNumberString(volume),
        excutedAmount: toBigNumberString(executed_volume),
        fee: toBigNumberString(paid_fee),
        createdAt: toTimestamp(created_at),
      };
    });
  },
};
