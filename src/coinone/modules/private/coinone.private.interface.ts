export interface ICoinoneWalletStatus {
  result: string; // "success";
  error_code: string; // "0";
  server_time: number; // 1644541746590;
  currencies: {
    name: string; // "Bitcoin";
    symbol: string; // "BTC";
    deposit_status: string; // "normal";
    withdraw_status: string; // "normal";
    deposit_confirm_count: number; // 2;
    max_precision: number; // 8;
    deposit_fee: string; // "0.0";
    withdrawal_min_amount: string; // "0.0001";
    withdrawal_fee: string; // "0.0015";
  }[];
}

export interface ICoinoneBalance {
  result: string; //"success";
  error_code: string; //"0";
  balances: {
    available: string; //"998999692485";
    limit: string; //"0";
    average_price: string; //"100000000";
    currency: string; // "BTC";
  }[];
}

export interface ICoinoneDepositAddress {
  result: string; // "success";
  errorCode: string; // "0";
  walletAddress: {
    [key: string]: string;
    // btc: "mnobqu4i6qMCJWDpf5UimRmr8JCvZ8FLcN";
    // eth: "0x61bB630D3B2e8eda0FC1d50F9f958eC02e3969F6";
    // xrp: "rGf3sLFW6q65YeQDCGDEFeFTKLKNxy6rDg";
    // xrp_tag: "1289063454";
    // eos: "coinonekorea";
    // eos_memo: "012345678";
  };
}

export interface ICoinoneDepositHistory {
  result: string; //"success";
  error_code: string; //"0";
  transactions: {
    id: string; //"0fec72eb-1e4d-11e9-9ec7-00e04c3600d7";
    currency: string; // "BTC";
    txid: string; //"bb1d723751cc4d312c38adc13d9a45b9a16608328d0b9a10f5e3ebc647d64506";
    type: string; //"WITHDRAWAL";
    from_address: string; //"muQoJGAySUJsn1c9iaj9GQitdVLJhnQVnL";
    from_secondary_address: string; //"153214622";
    to_address: string; //"n4G1hT3egiBQ6uSU5pLkGjiKJ6XGjS5k1P";
    to_secondary_address: string; //"";
    confirmations: number; // 3;
    amount: string; //"0.121";
    fee: string; //"0.0001";
    status: string; //"DEPOSIT_SUCCESS";
    created_at: number; // 1662108602000;
  }[];
}

export interface ICoinoneWithdrawHistory {
  result: string; //"success";
  error_code: string; //"0";
  transactions: {
    id: string; //"0fec72eb-1e4d-11e9-9ec7-00e04c3600d7";
    currency: string; // "BTC";
    txid: string; //"bb1d723751cc4d312c38adc13d9a45b9a16608328d0b9a10f5e3ebc647d64506";
    type: string; //"WITHDRAWAL";
    from_address: string; //"muQoJGAySUJsn1c9iaj9GQitdVLJhnQVnL";
    from_secondary_address: string; //"153214622";
    to_address: string; //"n4G1hT3egiBQ6uSU5pLkGjiKJ6XGjS5k1P";
    to_secondary_address: string; //"";
    confirmations: number; // 3;
    amount: string; //"0.121";
    fee: string; //"0.0001";
    status: string; //"DEPOSIT_SUCCESS";
    created_at: number; // 1662108602000;
  }[];
}

export interface ICoinoneCompletedHistory {
  result: string; //"success";
  error_code: string; // "0";
  completed_orders: {
    trade_id: string; //"0e2bb80f-1e4d-11e9-9ec7-00e04c3600d1";
    order_id: string; //"0e2b9627-1e4d-11e9-9ec7-00e04c3600d2";
    quote_currency: string; //"KRW";
    target_currency: string; //"BTC";
    order_type: string; //"LIMIT";
    is_ask: true;
    is_maker: true;
    price: string; //"8420";
    qty: string; //"0.1599";
    timestamp: number; // 8964000;
    fee_rate: string; //"0.001";
    fee: string; //"162";
    fee_currency: string; //"KRW";
  }[];
}

export interface ICoinoneUnCompletedHistory {
  result: string; // "success";
  error_code: string; // "0";
  active_orders: {
    order_id: string; // "0f5122d8-1e4d-11e9-9ec7-00e04c3600d7";
    type: string; // "STOP_LIMIT";
    quote_currency: string; // "KRW";
    target_currency: string; // "ETH";
    price: string; // "35000000";
    remain_qty: string; // "1";
    original_qty: string; // "1";
    canceled_qty: string; // "0";
    executed_qty: string; // "0";
    side: string; // "SELL";
    fee: string; // "0";
    fee_rate: string; // "0.0";
    average_executed_price: string; // "0";
    ordered_at: number; // 1682382211000;
    is_triggered: boolean; // false;
    trigger_price: string; // "37000000";
    triggered_at: string;
  }[];
}
