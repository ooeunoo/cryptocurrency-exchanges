export interface IBithumbResponse<T> {
  status: string;
  data?: T;
}

interface BithumbTickerData {
  opening_price: string;
  closing_price: string;
  min_price: string;
  max_price: string;
  units_traded: string;
  acc_trade_value: string;
  prev_closing_price: string;
  units_traded_24H: string;
  acc_trade_value_24H: string;
  fluctate_24H: string;
  fluctate_rate_24H: string;
}

export interface BithumbTicker {
  [currency: string]: BithumbTickerData | string; // date 필드
}

export interface BithumbBalance {
  [key: string]: string;
}

export interface BithumbDepositHistory {
  search: string; // "1";
  transfer_date: number; // 1572252297148997;
  order_currency: string; // "BTC";
  payment_currency: string; // "KRW";
  units: string; //  "0.0001";
  price: string; //  "10000000";
  amount: string; // "1000";
  fee_currency: string; // "KRW";
  fee: string; // "2.5";
  order_balance: string; // "6.498881591872";
  payment_balance: string; // "1140499718";
}

export interface BithumbWithdrawHistory {
  search: string; // "1";
  transfer_date: number; // 1572252297148997;
  order_currency: string; // "BTC";
  payment_currency: string; // "KRW";
  units: string; //  "0.0001";
  price: string; //  "10000000";
  amount: string; // "1000";
  fee_currency: string; // "KRW";
  fee: string; // "2.5";
  order_balance: string; // "6.498881591872";
  payment_balance: string; // "1140499718";
}

export interface BithumbOrderHistory {
  order_currency: string; // "BTC";
  payment_currency: string; // "KRW";
  order_id: string; // "C0101000007408440032";
  order_date: string; // "1571728739360570";
  type: string; // "bid";
  units: string; // "5.0";
  units_remaining: string; // "5.0";
  price: string; // "501000";
}

export interface BithumbDepositAddress {
  wallet_address: string; // "1H7WL8Lb8mxCTwpL1RN8yckL2gcPLgqtqD";
  currency: string; //  "BTC";
  net_type: string; //  "Bitcoina";
}
