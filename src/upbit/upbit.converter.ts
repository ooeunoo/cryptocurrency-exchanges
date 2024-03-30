import { toBigNumberString } from "@utils/number";
import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositWithdrawHistory,
  ExchangeOrderHistory,
  ExchangeTicker,
  ExchangeWalletStatus,
  depositWithdrawType,
  depsoitWithdrawState,
  orderSide,
  orderType,
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

export const depositHistoryConverter = (data: UpbitDepositHistory[]): ExchangeDepositWithdrawHistory[] => {
  const convertState = (state) => {
    switch (state) {
      case "PROCESSING": // 입금진행
        return depsoitWithdrawState.processing;
      case "ACCEPTED":
        return depsoitWithdrawState.accepted;
      case "CANCELLED":
        return depsoitWithdrawState.canceled;
      case "REJECTED":
        return depsoitWithdrawState.rejected;
      case "TRAVEL_RULE_SUSPECTED":
        return depsoitWithdrawState.travel_rule_suspected;
      case "REFUNDING":
        return depsoitWithdrawState.refunded;
      case "REFUNDED":
        return depsoitWithdrawState.refunded;
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
      toAddress: null,
      toAddressTag: null,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
    };
  });
};

export const withdrawHistoryConverter = (data: UpbitWithdrawHistory[]): ExchangeDepositWithdrawHistory[] => {
  const convertState = (state) => {
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
      toAddress: null,
      toAddressTag: null,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
    };
  });
};

export const orderHistoryConverter = (data: UpbitOrderHistory[]): ExchangeOrderHistory[] => {
  const convertorderType = (type) => {
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
    }
  };
  return data.map(({ uuid, market, ord_type, price, side, volume, executed_volume, created_at, paid_fee }) => {
    const [unit, currency] = market.split("-");

    return {
      id: uuid,
      type: convertorderType(ord_type),
      side: side == "ask" ? orderSide.ask : orderSide.bid,
      currency,
      unit,
      price: toBigNumberString(price),
      orderAmount: toBigNumberString(volume),
      excutedAmount: toBigNumberString(executed_volume),
      fee: toBigNumberString(paid_fee),
      createdAt: toTimestamp(created_at),
    };
  });
};
