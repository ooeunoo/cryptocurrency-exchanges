export interface CoinoneTicker {
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
      best_asks: [
        {
          price: string; //"1200.0";
          qty: string; //"1.234";
        },
      ];
      best_bids: [
        {
          price: string; //"1000.0";
          qty: string; //"0.123";
        },
      ];
      id: string; //"1499341142000001";
    },
  ];
}

export interface CoinoneWalletStatus {
  result: string; // "success";
  error_code: string; // "0";
  server_time: number; // 1644541746590;
  currencies: [
    {
      name: string; // "Bitcoin";
      symbol: string; // "BTC";
      deposit_status: string; // "normal";
      withdraw_status: string; // "normal";
      deposit_confirm_count: number; // 2;
      max_precision: number; // 8;
      deposit_fee: string; // "0.0";
      withdrawal_min_amount: string; // "0.0001";
      withdrawal_fee: string; // "0.0015";
    },
  ];
}

export interface CoinoneBalance {
  result: string; //"success";
  error_code: string; //"0";
  balances: [
    {
      available: string; //"998999692485";
      limit: string; //"0";
      average_price: string; //"100000000";
      currency: string; // "BTC";
    },
  ];
}
