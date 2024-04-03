export interface IKorbitSubscribeTicker {
  event: string //"korbit:push-ticker";
  timestamp: number //1389678052000;
  data: {
    channel: string //"ticker";
    currency_pair: string //"btc_krw";
    timestamp: number // 1558590089274;
    last: string //"9198500.1235789";
    open: string //"9500000.3445783";
    bid: string //"9192500.4578344";
    ask: string //"9198000.32148556";
    low: string //"9171500.23785685";
    high: string //"9599000.34876458";
    volume: string //"1539.18571988";
    change: string //"-301500.234578934";
  }
}

export interface IKorbitSubscribeTransaction {
  event: string //"korbit:push-transaction";
  timestamp: number //1389678052000;
  data: {
    channel: string //"transaction";
    currency_pair: string //"btc_krw";
    timestamp: number // 1389678052000;
    price: string //"569000.7654835";
    amount: string //"0.01000001";
    taker: string //"buy";
  }
}

export interface IKorbitSubscribeOrderbook {
  event: string //"korbit:push-orderbook";
  timestamp: number //1389678052000;
  data: {
    channel: string //"orderbook";
    currency_pair: string //"btc_krw";
    timestamp: number // 1386135077000;
    bids: {
      price: string // "1100000,2375876";
      amount: string //"0.0103918";
    }[]
    asks: {
      price: string // "569000.3467895";
      amount: string //"0.50000000"
    }[]
  }
}
