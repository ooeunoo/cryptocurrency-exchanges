export const constants = {
  apiUrl: 'https://api.bithumb.com',
  websocketUrl: 'wss://pubwss.bithumb.com/pub/ws',
  endpoints: {
    market: '/public/ticker',
    ticker: '/public/ticker',
    walletStatus: '/public/assetsstatus/multichain/ALL',
    balance: '/info/balance',
    depositAddress: '/info/wallet_address',
    depositHistory: '/info/user_transactions',
    withdrawHistory: '/info/user_transactions',
    completedOrderHistory: '',
    unCompletedOrderHistory: '',
  },
  SubscribeType: {
    ticker: 'ticker',
    transaction: 'transaction',
    orderbook: 'orderbookdepth',
  },
}
