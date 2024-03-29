import { RawAxiosRequestHeaders } from "axios";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as queystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "@exchange/exchange";
import { UPBIT_BASE_URL, UPBIT_PRIVATE_ENDPOINT, UPBIT_PUBLIC_ENDPOINT } from "@upbit/upbit.constant";
import {
  balanceConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  marketConverter,
  marketPriceConverter,
  orderHistoryConverter,
  withdrawHistoryConverter,
} from "@upbit/upbit.converter";
import {
  UpbitBalance,
  UpbitDepositAddress,
  UpbitDepositHistory,
  UpbitMarket,
  UpbitMarketPrice,
  UpbitOrderHistory,
  UpbitWithdrawHistory,
} from "@upbit/upbit.interface";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";
import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositHistory,
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeOrderHistory,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import { Method, requestPublic, requestSign } from "@common/requests";

export class Upbit extends Exchange {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    super();
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<ExchangeMarket[]> {
    const result = await requestPublic<UpbitMarket[]>(UPBIT_BASE_URL, UPBIT_PUBLIC_ENDPOINT.market_all);
    return marketConverter(result);
  }

  /* ------------------마켓 현재가 조회-------------------- */
  public async fetchMarketsPrices(markets: string[]): Promise<ExchangeMarketPrice[]> {
    const result = await requestPublic<UpbitMarketPrice[]>(UPBIT_BASE_URL, UPBIT_PUBLIC_ENDPOINT.ticker, {
      markets: markets.join(","),
    });
    return marketPriceConverter(result);
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalances(): Promise<ExchangeBalance[]> {
    const result = await requestSign<UpbitBalance[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.balance,
      this._header(),
      null,
      null,
    );
    return balanceConverter(result);
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(currency: string, network: string): Promise<ExchangeDepositAddress> {
    const params = { currency, net_type: network };
    const result = await requestSign<UpbitDepositAddress>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposit_coin_address,
      this._header(params),
      null,
      params,
    );
    return depositAddressesConverter(result);
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositHistory[]> {
    const params = { currency, page, limit };
    const result = await requestSign<UpbitDepositHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.deposits,
      this._header(params),
      null,
      params,
    );
    return depositHistoryConverter(result);
  }

  /* ------------------출금 내역 조회-------------------- */
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeWithdrawHistory[]> {
    const params = { currency, page, limit };
    const result = await requestSign<UpbitWithdrawHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.withdraws,
      this._header(params),
      null,
      params,
    );
    return withdrawHistoryConverter(result);
  }

  /* ------------------주문 내역 조회-------------------- */
  public async fetchOrderHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeOrderHistory[]> {
    const params = { currency, page, limit };
    const result = await requestSign<UpbitOrderHistory[]>(
      Method.GET,
      UPBIT_BASE_URL,
      UPBIT_PRIVATE_ENDPOINT.order,
      this._header(params),
      null,
      params,
    );
    return orderHistoryConverter(result);
  }

  /* -------------------------------------- */
  private _header(params?: any): RawAxiosRequestHeaders {
    const payload: any = {
      access_key: this.accessKey,
      nonce: uuidv4(),
    };

    if (params && Object.keys(params).length != 0) {
      const query = queystring.encode(params);
      const hash = crypto.createHash("sha512");
      const queryHash = hash.update(query, "utf-8").digest("hex");

      payload.query_hash = queryHash;
      payload.query_hash_alg = "SHA512";
    }

    const token = sign(payload, this.secretKey);
    return { Authorization: `Bearer ${token}` };
  }
}
