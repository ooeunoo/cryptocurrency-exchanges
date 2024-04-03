export const constants = {
  apiUrl: 'https://api.coinone.co.kr',
  websocketUrl: 'wss://stream.coinone.co.kr',

  endpoints: {
    market: '/public/v2/ticker_new/KRW',
    ticker: '/public/v2/ticker_new/KRW',
    walletStatus: '/public/v2/currencies',
    balance: '/v2.1/account/balance/all',
    depositAddress: '/v2/account/deposit_address',
    depositHistory: '/v2.1/transaction/coin/history',
    withdrawHistory: '/v2.1/transaction/coin/history',
    completedOrderHistory: '/v2.1/order/completed_orders/all',
    unCompletedOrderHistory: '/v2.1/order/active_orders',
  },
  subscribeType: {
    ticker: 'TICKER',
    transaction: 'TRADE',
    orderbook: 'ORDERBOOK',
  },
}
