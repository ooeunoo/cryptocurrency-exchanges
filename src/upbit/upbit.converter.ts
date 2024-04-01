import { toBigNumberString } from "@utils/number";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IOrderHistory,
  ISubscribeAllTrade,
  ISubscribeMyTrade,
  ISubscribeOrderbook,
  ISubscribeTicker,
  ITicker,
  IWalletStatus,
} from "@exchange/exchange.interface";
import {
  IUpbitBalance,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitOrderHistory,
  IUpbitSubscribeMyTrade,
  IUpbitSubscribeOrderbook,
  IUpbitSubscribeTicker,
  IUpbitSubscribeTrade,
  IUpbitTicker,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from "@upbit/upbit.interface";
import { toTimestamp } from "@utils/time";
import { TickerChange, depositWithdrawType, depsoitWithdrawState, orderSide, orderState, orderType } from "@exchange/exchange.enum";

export const upbitTickerConverter = (data: IUpbitTicker[]): ITicker[] => {
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

export const upbitWalletStatusConverter = (data: IUpbitWalletStatus[]): IWalletStatus[] => {
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

export const upbitBalanceConverter = (data: IUpbitBalance[]): IBalance[] => {
  return data.map(({ currency, balance, locked, avg_buy_price }) => {
    return {
      currency,
      balance: toBigNumberString(balance),
      lockedBalance: toBigNumberString(locked),
      avgBuyPrice: toBigNumberString(avg_buy_price),
    };
  });
};

export const upbitDepositAddressesConverter = (data: IUpbitDepositAddress[]): IDepositAddress[] => {
  return data.map(({ currency, net_type, deposit_address, secondary_address }) => {
    return {
      currency: currency.toUpperCase(),
      network: net_type.toUpperCase(),
      address: deposit_address,
      memo: secondary_address ?? null,
    };
  });
};

export const upbitDepositHistoryConverter = (data: IUpbitDepositHistory[]): IDepositWithdrawHistory[] => {
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
      fromAddressTag: null,
      toAddress: null,
      toAddressTag: null,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
    };
  });
};

export const upbitWithdrawHistoryConverter = (data: IUpbitWithdrawHistory[]): IDepositWithdrawHistory[] => {
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
      fromAddressTag: null,
      toAddress: null,
      toAddressTag: null,
      createdAt: toTimestamp(created_at),
      confirmedAt: toTimestamp(done_at),
    };
  });
};

export const upbitOrderHistoryConverter = (data: IUpbitOrderHistory[]): IOrderHistory[] => {
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
  const convertState = (state) => {
    switch (state) {
      case "wait":
        return orderState.wait;
      case "watch":
        return orderState.wait;
      case "done":
        return orderState.done;
      case "cancel":
        return orderState.cancel;
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
};

export const upbitSubscribeTickerConverter = (data: IUpbitSubscribeTicker): ISubscribeTicker => {
  const [unit, currency] = data.code.split("-");
  const convertChange = (change) => {
    switch (change) {
      case "FALL":
        return TickerChange.fall;
      case "RISE":
        return TickerChange.rise;
      case "EVEN":
        return TickerChange.even;
      default:
        return null;
    }
  };
  return {
    currency: currency.toUpperCase(),
    unit: unit.toUpperCase(),
    high: toBigNumberString(data.high_price),
    low: toBigNumberString(data.low_price),
    first: toBigNumberString(data.opening_price),
    last: toBigNumberString(data.trade_price),
    change: convertChange(data.change),
    accTradeVolume: toBigNumberString(data.acc_trade_volume),
    accTradeVolume24h: toBigNumberString(data.acc_trade_price_24h),
    accTradePrice: toBigNumberString(data.acc_trade_price),
    accTradePrice24h: toBigNumberString(data.acc_trade_price_24h),
    timestamp: data.timestamp,
  };
};

export const upbitSubscribeAllTradeConverter = (data: IUpbitSubscribeTrade): ISubscribeAllTrade => {
  const [unit, currency] = data.code.split("-");
  return {
    currency: currency.toUpperCase(),
    unit: unit.toUpperCase(),
    price: toBigNumberString(data.trade_price),
    amount: toBigNumberString(data.trade_volume),
    side: data.ask_bid == "ASK" ? orderSide.ask : orderSide.bid,
    timestamp: data.trade_timestamp,
  };
};

export const upbitSubscribeOrderbookConverter = (data: IUpbitSubscribeOrderbook): ISubscribeOrderbook => {
  const [unit, currency] = data.code.split("-");
  const orderbooks = {
    ask: [],
    bid: [],
  };

  data.orderbook_units.map(({ ask_price, bid_price, ask_size, bid_size }) => {
    orderbooks.ask.push({ price: ask_price, amount: ask_size });
    orderbooks.bid.push({ price: bid_price, amount: bid_size });
  });

  return {
    currency: currency.toUpperCase(),
    unit: unit.toUpperCase(),
    orderbooks,
    timestamp: data.timestamp,
  };
};

export const upbitSubscribeMyTradeConverter = (data: IUpbitSubscribeMyTrade): ISubscribeMyTrade => {
  const [unit, currency] = data.code.split("-");

  return {
    currency: currency.toUpperCase(),
    unit: unit.toUpperCase(),
    side: data.ask_bid == "ASK" ? orderSide.ask : orderSide.bid,
    price: toBigNumberString(data.price),
    amount: toBigNumberString(data.volume),
    timestamp: data.trade_timestamp,
  };
};
