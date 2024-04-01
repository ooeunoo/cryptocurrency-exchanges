import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as querystring from "querystring";
import * as crypto from "crypto";
import { IExchangeShared } from "@common/interfaces/exchange.shared.interface";

export class UpbitShared implements IExchangeShared {
  apiUrl = "https://api.upbit.com/v1";
  websocketUrl = "wss://api.upbit.com/websocket/v1";
  endpoints = {
    market: "/market/all",
    ticker: "/ticker",
    walletStatus: "/status/wallet",
    balance: "/accounts",
    depositAddress: "/deposits/coin_addresses",
    depositHistory: "/deposits",
    withdrawHistory: "/withdraws",
    completedOrderHistory: "/orders",
    unCompletedOrderHistory: "/orders",
  };
  subscribeType = {
    ticker: "ticker",
    transaction: "trade",
    orderbook: "orderbook",
    myTransaction: "myTrade",
  };

  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  header(options?: { params: any }) {
    const payload: any = {
      access_key: this.accessKey,
      nonce: uuidv4(),
    };

    let query: string = "";

    const { params } = options;

    if (params && Object.keys(params).length != 0) {
      let nonArrayQuery = null;
      let arrayQuery = null;

      const arrayParams = {};
      const nonArrayParams = {};

      // Array 값을 가진 파라미터와 아닌 파라미터 분리
      for (const key in params) {
        if (Array.isArray(params[key])) {
          arrayParams[key] = params[key];
        } else {
          nonArrayParams[key] = params[key];
        }
      }

      // 각각 다르게 인코딩
      if (Object.keys(nonArrayParams).length != 0) {
        nonArrayQuery = querystring.encode(nonArrayParams);
      }

      if (Object.keys(arrayParams).length != 0) {
        arrayQuery = Object.keys(arrayParams)
          .map((key) => {
            const values = arrayParams[key];
            return values.map((value) => `${key}[]=${value}`).join("&");
          })
          .join("&");
      }

      // 쿼리 생성
      if (nonArrayQuery != null && arrayQuery != null) {
        query += nonArrayQuery + "&" + arrayQuery;
      } else if (nonArrayQuery != null) {
        query += nonArrayQuery;
      } else if (arrayQuery != null) {
        query += arrayQuery;
      }

      const hash = crypto.createHash("sha512");
      const queryHash = hash.update(query, "utf-8").digest("hex");
      payload.query_hash = queryHash;
      payload.query_hash_alg = "SHA512";
    }

    const token = sign(payload, this.secretKey);
    return { Authorization: `Bearer ${token}` };
  }
}
