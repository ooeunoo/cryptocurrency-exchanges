export interface IBithumbResponse<T> {
  status: string;
  data?: T;
}

export interface BithumbTicker {
  [currency: string]: {
    opening_price: string; // "54353000";
    closing_price: string; // "53768000";
    min_price: string; // "53000000";
    max_price: string; // "54610000";
    units_traded: string; // "1378.61062205";
    acc_trade_value: string; // "74345961713.2492";
    prev_closing_price: string; // "54372000";
    units_traded_24H: string; // "3486.39812606";
    acc_trade_value_24H: string; // "191016108210.6192";
    fluctate_24H: string; // "-1974000";
    fluctate_rate_24H: string; // "-3.54";
  };
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

export interface BithumbOrderHistory {}

export interface BithumbDepositAddress {
  wallet_address: string; // "1H7WL8Lb8mxCTwpL1RN8yckL2gcPLgqtqD";
  currency: string; //  "BTC";
  net_type: string; //  "Bitcoina";
}
