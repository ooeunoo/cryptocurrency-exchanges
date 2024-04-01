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

export interface IUpbitSubscribeTransaction {
  type: string; // "trade";
  code: string; // "KRW-BTC";
  timestamp: number; // 1676965220452;
  trade_date: string; // "2023-02-21";
  trade_time: string; // "07:40:20";
  trade_timestamp: number; // 1676965220395;
  trade_price: number; //  32292000;
  trade_volume: number; // 0.03096742;
  ask_bid: string; // "BID";
  prev_closing_price: number; // 31883000.0;
  change: string; // "RISE";
  change_price: number; // 409000.0;
  sequential_id: number; // 1676965220395000;
  stream_type: string; // "SNAPSHOT";
}

export interface IUpbitSubscribeOrderbook {
  type: string; // "orderbook";
  code: string; // "KRW-BTC";
  timestamp: number; // 1704867306396;
  total_ask_size: number; // 7.3262086;
  total_bid_size: number; // 29.27948667;
  orderbook_units: [
    {
      ask_price: number; // 61820000;
      bid_price: number; // 61800000;
      ask_size: number; // 1.44125174;
      bid_size: number; // 8.95463042;
    },
  ];
}

export interface IUpbitSubscribeMyTransaction {
  type: string; // "myTrade";
  code: string; //"KRW-BTC";
  ask_bid: string; //"BID";
  price: number; //  55660000;
  volume: number; // 0.5389867;
  order_uuid: string; //"e5cec6f9-6a15-4c95-ae76-6d7dcb3a00e0";
  order_type: string; //"price";
  trade_uuid: string; //"cd955522-c9d8-4f06-b86d-54a09a25e707";
  trade_timestamp: number; // 1677487182655;
  stream_type: string; //"REALTIME";
}
