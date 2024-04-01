export const constants = {
  apiUrl: "https://api.korbit.co.kr/v1",
  websocketUrl: "wss://ws.korbit.co.kr/v1/user/push",
  endpoints: {
    oauth2: "/oauth2/access_token",
    market: "/ticker/detailed/all",
    ticker: "/ticker/detailed/all",
    walletStatus: "",
    balance: "/user/balances",
    depositAddress: "/user/accounts",
    depositHistory: "/user/transfers",
    withdrawHistory: "/user/transfers",
    completedOrderHistory: "/user/orders",
    unCompletedOrderHistory: "/user/orders",
  },
  subscribeType: {
    ticker: "ticker",
    transaction: "transaction",
    orderbook: "orderbook",
  },
};
