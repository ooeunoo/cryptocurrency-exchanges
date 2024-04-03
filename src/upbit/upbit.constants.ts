export const constants = {
  apiUrl: 'https://api.upbit.com/v1',
  websocketUrl: 'wss://api.upbit.com/websocket/v1',
  endpoints: {
    market: '/market/all',
    ticker: '/ticker',
    walletStatus: '/status/wallet',
    balance: '/accounts',
    depositAddress: '/deposits/coin_address',
    depositHistory: '/deposits',
    withdrawHistory: '/withdraws',
    completedOrderHistory: '/orders',
    unCompletedOrderHistory: '/orders',
  },
  subscribeType: {
    ticker: 'ticker',
    transaction: 'trade',
    orderbook: 'orderbook',
    myTransaction: 'myTrade',
  },
}
