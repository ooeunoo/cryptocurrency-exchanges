export interface ICoinoneSubscribeTicker {
  response_type: string; // "DATA";
  channel: string; //"TICKER";
  data: {
    quote_currency: string; //"KRW";
    target_currency: string; //"XRP";
    timestamp: number; // 1693560360010;
    quote_volume: string; //"55904975548.1528";
    target_volume: string; //"80021677.1681579";
    high: string; //"699.5";
    low: string; //"683.9";
    first: string; //"698.7";
    last: string; //"687.9";
    volume_power: string; //"100";
    ask_best_price: string; //"687.9";
    ask_best_qty: string; //"7594.1842";
    bid_best_price: string; //"687.8";
    bid_best_qty: string; //"13861.6179";
    id: string; //"1693560360010001";
    yesterday_high: string; //"717.5";
    yesterday_low: string; //"690.4";
    yesterday_first: string; //"716.9";
    yesterday_last: string; //"698.7";
    yesterday_quote_volume: string; //"41578655254.7044";
    yesterday_target_volume: string; //"58194911.41691376";
  };
}

export interface ICoinoneSubscribeTransaction {
  response_type: string; //"DATA";
  channel: string; //"TRADE";
  data: {
    quote_currency: string; // "KRW";
    target_currency: string; //"XRP";
    id: string; //"1693560450996001";
    timestamp: number; // 1693560450996;
    price: string; //"688.3";
    qty: string; //"5000";
    is_seller_maker: boolean; //true;
  };
}

export interface ICoinoneSubscribeOrderbook {
  response_type: string; //"DATA";
  channel: string; //"ORDERBOOK";
  data: {
    quote_currency: string; //"KRW";
    target_currency: string; //"XRP";
    timestamp: number; // 1693560155038;
    id: string; //"1693560155038001";
    asks: {
      price: string; //"695.5";
      qty: string; //"5000";
    }[];
    bids: {
      price: string; //"687.4";
      qty: string; //"6704.0994";
    }[];
  };
}
