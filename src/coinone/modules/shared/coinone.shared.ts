import * as crypto from "crypto";
import { IExchangeShared, ISharedEndpoint } from "../../../common/interfaces/exchange.shared.interface";

export class CoinoneShared implements IExchangeShared {
  apiUrl = "https://api.coinone.co.kr";
  websocketUrl = "wss://stream.coinone.co.kr";

  endpoints: ISharedEndpoint = {
    market: "/public/v2/ticker_new/KRW",
    ticker: "/public/v2/ticker_new/KRW",
    walletStatus: "/public/v2/currencies",
    balance: "/v2.1/account/balance/all",
    depositAddress: "/v2/account/deposit_address",
    depositHistory: "/v2.1/transaction/coin/history",
    withdrawHistory: "/v2.1/transaction/coin/history",
    completedOrderHistory: "/v2.1/order/completed_orders/all",
    unCompletedOrderHistory: "/v2.1/order/active_orders",
  };

  subscribeType = {
    ticker: "TICKER",
    transaction: "TRADE",
    orderbook: "ORDERBOOK",
  };

  protected accessKey?: string;
  private secretKey?: string;

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  header(options?: any) {
    const payload = options.payload;
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature = crypto.createHmac("sha512", this.secretKey!).update(encodedPayload).digest("hex");
    return {
      "Content-type": "application/json",
      "X-COINONE-PAYLOAD": encodedPayload,
      "X-COINONE-SIGNATURE": signature,
    };
  }
}
