export interface ICoinoneMarket {
  result: string; // "success";
  error_code: string; // "0";
  server_time: number; //1416895635000;
  tickers: [
    {
      quote_currency: string; //"KRW";
      target_currency: string; //"BTC";
      timestamp: number; // 1499341142000;
      high: string; //"3845000.0";
      low: string; //"3819000.0";
      first: string; //"3825000.0";
      last: string; //"3833000.0";
      quote_volume: string; //"10000.0";
      target_volume: string; //"163.3828";
      best_asks: {
        price: string; //"1200.0";
        qty: string; //"1.234";
      }[];
      best_bids: {
        price: string; //"1000.0";
        qty: string; //"0.123";
      }[];
      id: string; //"1499341142000001";
    },
  ];
}
export interface ICoinoneTicker {
  result: string; // "success";
  error_code: string; // "0";
  server_time: number; //1416895635000;
  tickers: [
    {
      quote_currency: string; //"KRW";
      target_currency: string; //"BTC";
      timestamp: number; // 1499341142000;
      high: string; //"3845000.0";
      low: string; //"3819000.0";
      first: string; //"3825000.0";
      last: string; //"3833000.0";
      quote_volume: string; //"10000.0";
      target_volume: string; //"163.3828";
      best_asks: {
        price: string; //"1200.0";
        qty: string; //"1.234";
      }[];
      best_bids: {
        price: string; //"1000.0";
        qty: string; //"0.123";
      }[];
      id: string; //"1499341142000001";
    },
  ];
}
