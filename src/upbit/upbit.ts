import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as querystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "@exchange/exchange";
import {
  UPBIT_BASE_URL,
  UPBIT_PRIVATE_ENDPOINT,
  UPBIT_PRIVATE_STREAM_DATA_TYPE,
  UPBIT_PUBLIC_ENDPOINT,
  UPBIT_PUBLIC_STREAM_DATA_TYPE,
  UPBIT_WEBSOCKET_URL,
} from "@upbit/upbit.constant";
import {
  upbitBalanceConverter,
  upbitDepositAddressesConverter,
  upbitDepositHistoryConverter,
  upbitMarketsConverter,
  upbitOrderHistoryConverter,
  upbitSubscribeAllTradeConverter,
  upbitSubscribeMyTradeConverter,
  upbitSubscribeOrderbookConverter,
  upbitSubscribeTickerConverter,
  upbitTickerConverter,
  upbitWalletStatusConverter,
  upbitWithdrawHistoryConverter,
} from "@upbit/upbit.converter";
import {
  IUpbitBalance,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitOrderHistory,
  IUpbitSubscribeTicker,
  IUpbitTicker,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from "@upbit/upbit.interface";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IMarket,
  IOrderHistory,
  ISubscribeTicker,
  ITicker,
  IWalletStatus,
} from "@exchange/exchange.interface";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";
import { sortBy } from "@utils/array";
import { WebSocketClient } from "@exchange/exchange.socket";

export class Upbit extends Exchange {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    super();
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  public async fetchMarkets(): Promise<string[]> {
    return requestPublic(Method.GET, UPBIT_BASE_URL, UPBIT_PUBLIC_ENDPOINT.market, null, null, upbitMarketsConverter);
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const markets = await this.fetchMarkets();
    return requestPublic<IUpbitTicker[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PUBLIC_ENDPOINT.ticker,
      { markets: markets.join(",") },
      null,
      upbitTickerConverter,
    );
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  @upbitPrivate
  public async fetchWalletStatus(): Promise<IWalletStatus[]> {
    return requestSign<IUpbitWalletStatus[]>(
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
  public async fetchBalances(): Promise<IBalance[]> {
    return requestSign<IUpbitBalance[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.balance,
      this._header(),
      null,
      null,
      upbitBalanceConverter,
    );
  }

  /* ------------------입금 주소 조회-------------------- */
  @upbitPrivate
  public async fetchDepositAddresses(): Promise<IDepositAddress[]> {
    return requestSign<IUpbitDepositAddress[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposit_addresses,
      this._header(),
      null,
      null,
      upbitDepositAddressesConverter,
    );
  }
  /* ------------------입금 내역 조회-------------------- */
  @upbitPrivate
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestSign<IUpbitDepositHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposits,
      this._header(params),
      null,
      params,
      upbitDepositHistoryConverter,
    );
  }

  /* ------------------출금 내역 조회-------------------- */
  @upbitPrivate
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestSign<IUpbitWithdrawHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.withdraws,
      this._header(params),
      null,
      params,
      upbitWithdrawHistoryConverter,
    );
  }
  /* ------------------주문 내역 조회-------------------- */
  @upbitPrivate
  public async fetchOrderHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { currency, page, limit, states: ["done", "cancel"] };
    return requestSign<IUpbitOrderHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.order,
      this._header(params),
      null,
      params,
      upbitOrderHistoryConverter,
    );
  }

  /* ------------------공개 데이터 구독-------------------- */
  public async subscribePublicData(type: UPBIT_PUBLIC_STREAM_DATA_TYPE) {
    const markets = this.fetchMarkets();
    const data = [{ ticket: uuidv4() }, { type, codes: markets, isOnlyRealtime: true }];
    let converter;
    if (type == UPBIT_PUBLIC_STREAM_DATA_TYPE.ticker) converter = upbitSubscribeTickerConverter;
    if (type == UPBIT_PUBLIC_STREAM_DATA_TYPE.trade) converter = upbitSubscribeAllTradeConverter;
    if (type == UPBIT_PUBLIC_STREAM_DATA_TYPE.orderbook) converter = upbitSubscribeOrderbookConverter;
    const ws = new WebSocketClient(UPBIT_WEBSOCKET_URL, null, data, converter);
    return ws;
  }

  /* ------------------비공개 데이터 구독-------------------- */
  @upbitPrivate
  public async subscribePrivateData(type: UPBIT_PRIVATE_STREAM_DATA_TYPE = UPBIT_PRIVATE_STREAM_DATA_TYPE.myTrade) {
    const data = [{ ticket: uuidv4() }, { type }];
    let converter;
    if (type == UPBIT_PRIVATE_STREAM_DATA_TYPE.myTrade) converter = upbitSubscribeMyTradeConverter;
    const ws = new WebSocketClient(UPBIT_WEBSOCKET_URL, this._header(), data, converter);
    return ws;
  }

  /* -----------------헤더------------------ */
  private _header(params?: any): any {
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
