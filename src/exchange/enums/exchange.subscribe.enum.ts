export enum TickerChange {
  rise = 'rise', // 상승
  even = 'even', // 보합
  fall = 'fall', // 하락
  unknown = 'unknown',
}

export enum SubscribeType {
  ticker = 'ticker',
  transaction = 'transaction',
  orderbook = 'orderbook',
  myTransaction = 'myTransaction',
  unknown = 'unknown',
}
