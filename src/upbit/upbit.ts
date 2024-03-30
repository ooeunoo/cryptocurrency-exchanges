import { RawAxiosRequestHeaders } from "axios";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as querystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "@exchange/exchange";
import { UPBIT_BASE_URL, UPBIT_PRIVATE_ENDPOINT, UPBIT_PUBLIC_ENDPOINT } from "@upbit/upbit.constant";
import {
  balanceConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  orderHistoryConverter,
  upbitTickerConverter,
  upbitWalletStatusConverter,
  withdrawHistoryConverter,
} from "@upbit/upbit.converter";
import {
  UpbitBalance,
  UpbitDepositAddress,
  UpbitDepositHistory,
  UpbitOrderHistory,
  UpbitTicker,
  UpbitWalletStatus,
  UpbitWithdrawHistory,
} from "@upbit/upbit.interface";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";
import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositWithdrawHistory,
  ExchangeOrderHistory,
  ExchangeTicker,
} from "@exchange/exchange.interface";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";

export class Upbit extends Exchange {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    super();
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ExchangeTicker[]> {
    const marketResponse = await requestPublic(Method.GET, UPBIT_BASE_URL, UPBIT_PUBLIC_ENDPOINT.market_all, null, null);
    return requestPublic<UpbitTicker[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PUBLIC_ENDPOINT.ticker,
      { markets: marketResponse.map(({ market }) => market).join(",") },
      null,
      upbitTickerConverter,
    );
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  @upbitPrivate
  public async fetchWalletStatus(): Promise<any> {
    return requestSign<UpbitWalletStatus[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PUBLIC_ENDPOINT.wallet_status,
      this._header(),
      null,
      null,
      upbitWalletStatusConverter,
    );
  }

  /* ------------------잔액 조회-------------------- */
  @upbitPrivate
  public async fetchBalances(): Promise<ExchangeBalance[]> {
    return requestSign<UpbitBalance[]>(Method.GET, UPBIT_BASE_URL, UPBIT_PRIVATE_ENDPOINT.balance, this._header(), null, null, balanceConverter);
  }

  /* ------------------입금 주소 조회-------------------- */
  @upbitPrivate
  public async fetchDepositAddresses(): Promise<ExchangeDepositAddress[]> {
    return requestSign<UpbitDepositAddress[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposit_addresses,
      this._header(),
      null,
      null,
      depositAddressesConverter,
    );
  }
  /* ------------------입금 내역 조회-------------------- */
  @upbitPrivate
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestSign<UpbitDepositHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposits,
      this._header(params),
      null,
      params,
      depositHistoryConverter,
    );
  }
  /* ------------------출금 내역 조회-------------------- */
  @upbitPrivate
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestSign<UpbitWithdrawHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.withdraws,
      this._header(params),
      null,
      params,
      withdrawHistoryConverter,
    );
  }
  /* ------------------주문 내역 조회-------------------- */
  @upbitPrivate
  public async fetchOrderHistory(
    currency: string,
    unit: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeOrderHistory[]> {
    const params = { states: ["done", "cancel"] };
    return requestSign<UpbitOrderHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.order,
      this._header(params),
      null,
      params,
      orderHistoryConverter,
    );
  }

  /* -----------------헤더------------------ */
  private _header(params?: any): RawAxiosRequestHeaders {
    const payload: any = {
      access_key: this.accessKey,
      nonce: uuidv4(),
    };

    let query: string = "";
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
      if (nonArrayQuery != null) {
        query += nonArrayQuery;
      } else if (nonArrayQuery != null && arrayQuery != null) {
        query += nonArrayQuery + "&" + arrayQuery;
      } else {
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

function upbitPrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.accessKey || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}
