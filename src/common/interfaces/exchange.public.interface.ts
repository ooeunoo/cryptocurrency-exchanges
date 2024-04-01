export interface IExchangePublic {
  fetchMarkets(): Promise<IMarket[]>;
  fetchTickers(): Promise<ITicker[]>;
}

export interface IExchangePublicConverter {
  markets: (data: any) => IMarket[];
  tickers: (data: any) => ITicker[];

  // for bithumb
  marketskrw?: (data: any) => IMarket[];
  marketsbtc?: (data: any) => IMarket[];
  tickerskrw?: (data: any) => ITicker[];
  tickersbtc?: (data: any) => ITicker[];
}

export interface IMarket {
  currency: string; //
  unit: string;
}

export interface ITicker {
  currency: string; // base
  unit: string; // quote
  high: string; //	고가 (24시간 기준)
  low: string; //	저가 (24시간 기준)
  first: string; //	시가 (24시간 기준)
  last: string; // 종가 (24시간 기준)
}
