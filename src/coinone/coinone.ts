import * as queystring from "querystring";
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { Exchange } from "@exchange/exchange";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";
import { IBalance, IDepositAddress, IMarket, IMarketPrice, IOrderHistory, ITicker, IWalletStatus } from "@exchange/exchange.interface";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";
import axios from "axios";
import { COINONE_BASE_URL, COINONE_PRIVATE_ENDPOINT, COINONE_PUBLIC_ENDPOINT } from "./coinone.constant";
import { coinoneBalanceConverter, coinoneTickerConverter, coinoneWalletStatusConvereter } from "./coinone.converter";

export class Coinone {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /* ------------------마켓 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    return requestPublic(Method.GET, COINONE_BASE_URL, COINONE_PUBLIC_ENDPOINT.ticker, null, null, coinoneTickerConverter);
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<IWalletStatus[]> {
    return requestPublic(Method.GET, COINONE_BASE_URL, COINONE_PUBLIC_ENDPOINT.wallet_status, null, null, coinoneWalletStatusConvereter);
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalances(): Promise<IBalance> {
    const data = {
      access_token: this.accessKey,
      nonce: uuidv4(),
    };
    return requestSign(
      Method.POST,
      COINONE_BASE_URL,
      COINONE_PRIVATE_ENDPOINT.balance,
      this._headers(data),
      JSON.stringify(data),
      null,
      coinoneBalanceConverter,
    );
  }

  /* ------------------헤더-------------------- */
  private _headers(payload: any) {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature = crypto.createHmac("sha512", this.secretKey).update(encodedPayload).digest("hex");
    return {
      "Content-type": "application/json",
      "X-COINONE-PAYLOAD": encodedPayload,
      "X-COINONE-SIGNATURE": signature,
    };
  }
}

function coinonePrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.connectKey || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}
