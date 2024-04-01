export interface IUpbitMarket {
  market: string; // "KRW-BTC";
  korean_name: string; //"비트코인";
  english_name: string; //"Bitcoin";
  market_warning: string; //"NONE";
}

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
