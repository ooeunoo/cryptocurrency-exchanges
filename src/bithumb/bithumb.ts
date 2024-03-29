import { BITHUMB_BASE_URL, BITHUMB_PRIVATE_DOMAIN, BITHUMB_PUBLIC_DOMAIN } from "@bithumb/bithumb.constant";
import {
  balanceConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  marketConverterBTC,
  marketConverterKRW,
  marketPriceConverterBTC,
  marketPriceConverterKRW,
  orderHistoryConverter,
  withdrawHistoryConverter,
} from "@bithumb/bithumb.converter";
import {
  BithumbBalance,
  BithumbDepositAddress,
  BithumbDepositHistory,
  BithumbOrderHistory,
  BithumbTicker,
  BithumbWithdrawHistory,
  IBithumbResponse,
} from "@bithumb/bithumb.interface";
import * as queystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "@exchange/exchange";
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
import { CREDENTITAL_NOT_SETTED } from "@common/error";

function BithumbPrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.connectKey || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}

export class Bithumb extends Exchange {
  private connectKey: string;
  private secretKey: string;

  constructor(connectKey?: string, secretKey?: string) {
    super();
    this.connectKey = connectKey;
    this.secretKey = secretKey;
  }

  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<ExchangeMarket[]> {
    const resultkrw = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_KRW",
      null,
      null,
      marketConverterKRW,
    );
    const resultbtc = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_BTC",
      null,
      null,
      marketConverterBTC,
    );
    return resultkrw.concat(resultbtc);
  }
  /* ------------------마켓 현재가 조회-------------------- */
  public async fetchMarketsPrices(markets: string[]): Promise<ExchangeMarketPrice[]> {
    markets;
    const resultkrw = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_KRW",
      null,
      null,
      marketPriceConverterKRW,
    );
    const resultbtc = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_BTC",
      null,
      null,
      marketPriceConverterBTC,
    );
    return resultkrw.concat(resultbtc);
  }
  /* ------------------잔액 조회-------------------- */
  @BithumbPrivate
  public async fetchBalances(): Promise<ExchangeBalance[]> {
    const params = { currency: "ALL" };
    return requestSign<IBithumbResponse<BithumbBalance[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.balance,
      this._headers(BITHUMB_PRIVATE_DOMAIN.balance, params),
      queystring.stringify(params),
      null,
      balanceConverter,
    );
  }
  /* ------------------입금 주소 조회-------------------- */
  @BithumbPrivate
  public async fetchDepositAddress(currency: string, network: string): Promise<ExchangeDepositAddress> {
    const params = { currency, net_type: network };
    return requestSign<IBithumbResponse<BithumbDepositAddress>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.deposit_address,
      this._headers(BITHUMB_PRIVATE_DOMAIN.deposit_address, params),
      queystring.stringify(params),
      null,
      depositAddressesConverter,
    );
  }
  /* ------------------입금 내역 조회-------------------- */
  @BithumbPrivate
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositHistory[]> {
    const params = { searchGb: 4, order_currency: currency, offset: page, count: limit };
    return requestSign<IBithumbResponse<BithumbDepositHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
      null,
      depositHistoryConverter,
    );
  }
  /* ------------------출금 내역 조회-------------------- */
  @BithumbPrivate
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeWithdrawHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    return requestSign<IBithumbResponse<BithumbWithdrawHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
      null,
      withdrawHistoryConverter,
    );
  }
  /* ------------------주문 내역 조회-------------------- */
  @BithumbPrivate
  public async fetchOrderHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeOrderHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    return requestSign<IBithumbResponse<BithumbOrderHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
      null,
      orderHistoryConverter,
    );
  }

  /* ------------------헤더-------------------- */
  private _headers(endpoint, parameters) {
    const nonce = new Date().getTime();
    const requestSignature = `${endpoint}${String.fromCharCode(0)}${queystring.stringify(parameters)}${String.fromCharCode(0)}${nonce}`;
    const hmacSignature = Buffer.from(crypto.createHmac("sha512", this.secretKey).update(requestSignature).digest("hex")).toString("base64");

    return {
      "Api-Key": this.connectKey,
      "Api-Sign": hmacSignature,
      "Api-Nonce": nonce,
    };
  }
}
