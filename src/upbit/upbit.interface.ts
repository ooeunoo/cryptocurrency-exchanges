export interface IUpbitTicker {
  market: string; // "KRW-BTC";
  trade_date: string; // "20180418";
  trade_time: string; // "102340";
  trade_date_kst: string; // "20180418";
  trade_time_kst: string; // "192340";
  trade_timestamp: number; // 1524047020000;
  opening_price: number; //  8450000;
  high_price: number; //  8679000;
  low_price: number; // 8445000;
  trade_price: number; // 8621000;
  prev_closing_price: number; // 8450000;
  change: string; // "RISE";
  change_price: number; // 171000;
  change_rate: number; // 0.0202366864;
  signed_change_price: number; // 171000;
  signed_change_rate: number; // 0.0202366864;
  trade_volume: number; // 0.02467802;
  acc_trade_price: number; //  108024804862.58253;
  acc_trade_price_24h: number; // 232702901371.09308;
  acc_trade_volume: number; // 12603.53386105;
  acc_trade_volume_24h: number; // 27181.31137002;
  highest_52_week_price: number; // 28885000;
  highest_52_week_date: string; // "2018-01-06";
  lowest_52_week_price: number; // 4175000;
  lowest_52_week_date: string; // "2017-09-25";
  timestamp: number; // 1524047026072;
}

export interface IUpbitWalletStatus {
  currency: string; // "NEO";
  wallet_state: string; //"working";
  block_state: string; //"normal";
  block_height: string; //7235123;
  block_updated_at: string; //"2019-02-18T07:08:50.499+00:00";
  block_elapsed_minutes: number; //2502349;
  net_type: string; // "NEO";
  network_name: string; //"NEO N3";
}

export interface IUpbitBalance {
  currency: string; // "KRW";
  balance: string; //"1000000.0";
  locked: string; //"0.0";
  avg_buy_price: string; //"0";
  avg_buy_price_modified: boolean; // false;
  unit_currency: string; // "KRW";
}

export interface IUpbitDepositHistory {
  type: string; //"deposit";
  uuid: string; //"94332e99-3a87-4a35-ad98-28b0c969f830";
  currency: string; //"KRW";
  txid: string; //"9e37c537-6849-4c8b-a134-57313f5dfc5a";
  state: string; //"ACCEPTED";
  created_at: string; //"2017-12-08T15:38:02+09:00";
  done_at: string; //"2017-12-08T15:38:02+09:00";
  amount: string; //"100000.0";
  fee: string; //"0.0";
  transaction_type: string; // "default";
}

export interface IUpbitWithdrawHistory {
  type: string; //"withdraw";
  uuid: string; //"35a4f1dc-1db5-4d6b-89b5-7ec137875956";
  currency: string; //"XRP";
  txid: string; //"98c15999f0bdc4ae0e8a-ed35868bb0c204fe6ec29e4058a3451e-88636d1040f4baddf943274ce37cf9cc";
  state: string; //"DONE";
  created_at: string; //"2019-02-28T15:17:51+09:00";
  done_at: string; //"2019-02-28T15:22:12+09:00";
  amount: string; //"1.00";
  fee: string; //"0.0";
  transaction_type: string; // "default";
}

export interface IUpbitOrderHistory {
  uuid: string; //"9ca023a5-851b-4fec-9f0a-48cd83c2eaae";
  side: string; // "ask";
  ord_type: string; //"limit";
  price: string; //"4280000.0";
  state: string; //"done";
  market: string; //"KRW-BTC";
  created_at: string; //"2019-01-04T13:48:09+09:00";
  volume: string; //"1.0";
  remaining_volume: string; //"0.0";
  reserved_fee: string; //"0.0";
  remaining_fee: string; //"0.0";
  paid_fee: string; //"2140.0";
  locked: string; //"0.0";
  executed_volume: string; //"1.0";
  trades_count: number; // 1;
}

export interface IUpbitDepositAddress {
  currency: string; // "BTC";
  net_type: string; // 'BTC';
  deposit_address: string; //"3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD";
  secondary_address?: string; // null;
}

export interface IUpbitSubscribeTicker {
  type: string; // "ticker";
  code: string; // "KRW-POLYX";
  opening_price: number; // 860.1;
  high_price: number; //902.7;
  low_price: number; //826.4;
  trade_price: number; //853.5;
  prev_closing_price: number; //860.1;
  acc_trade_price: number; //217685190700.73276;
  change: string; // "FALL";
  change_price: number; //6.6;
  signed_change_price: number; // -6.6;
  change_rate: number; //0.0076735263;
  signed_change_rate: number; //-0.0076735263;
  ask_bid: string; // "ASK";
  trade_volume: number; //3013.0261604;
  acc_trade_volume: number; //250849319.96210873;
  trade_date: string; // "20240331";
  trade_time: string; // "091210";
  trade_timestamp: number; // 1711876330041;
  acc_ask_volume: number; //140908831.97408295;
  acc_bid_volume: number; // 109940487.98802578;
  highest_52_week_price: number; //951.5;
  highest_52_week_date: string; // "2024-03-26";
  lowest_52_week_price: number; //125;
  lowest_52_week_date: string; // "2023-06-10";
  market_state: string; // "ACTIVE";
  is_trading_suspended: false;
  delisting_date: null;
  market_warning: string; // "NONE";
  timestamp: number; //1711876330072;
  acc_trade_price_24h: number; // 480514756644.073;
  acc_trade_volume_24h: number; //547306522.6313522;
  stream_type: string; // "REALTIME";
}
