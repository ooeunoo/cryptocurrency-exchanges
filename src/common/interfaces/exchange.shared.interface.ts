export interface IExchangeShared {
  // header(options?: any): any;
}

export interface ISharedEndpoint {
  market: string;
  ticker: string;
  walletStatus: string;
  balance: string;
  depositAddress: string;
  depositHistory: string;
  withdrawHistory: string;
  completedOrderHistory: string;
  unCompletedOrderHistory: string;

  // korbit
  oauth2?: string;
}

export interface ISharedSubscribeType {
  ticker: string;
  transaction: string;
  orderbook: string;
  myTransaction?: string;
}
