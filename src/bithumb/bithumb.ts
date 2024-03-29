import { BITHUMB_BASE_URL, BITHUMB_PRIVATE_DOMAIN, BITHUMB_PUBLIC_DOMAIN } from "@bithumb/bithumb.constant";
import {
  balanceConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  marketConverter,
  marketPriceConverter,
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
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_KRW",
    );
    const resultbtc = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_BTC",
    );

    return marketConverter(resultkrw.data, "KRW").concat(marketConverter(resultbtc.data, "BTC"));
  }

  /* ------------------마켓 현재가 조회-------------------- */
  public async fetchMarketsPrices(markets: string[]): Promise<ExchangeMarketPrice[]> {
    markets;

    const resultkrw = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_KRW",
    );
    const resultbtc = await requestPublic<IBithumbResponse<BithumbTicker[]>>(
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_BTC",
    );

    delete resultkrw.data["date"];
    delete resultbtc.data["date"];

    return marketPriceConverter(resultkrw.data, "KRW").concat(marketPriceConverter(resultbtc.data, "BTC"));
  }
  /* ------------------잔액 조회-------------------- */
  public async fetchBalances(): Promise<ExchangeBalance[]> {
    const params = { currency: "ALL" };
    const result = await requestSign<IBithumbResponse<BithumbBalance[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_balanace,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_balanace, params),
      queystring.stringify(params),
    );
    return balanceConverter(result.data);
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(currency: string, network: string): Promise<ExchangeDepositAddress> {
    const params = { currency, net_type: network };
    const result = await requestSign<IBithumbResponse<BithumbDepositAddress>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_wallet_address,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_wallet_address, params),
      queystring.stringify(params),
    );
    return depositAddressesConverter(result.data);
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositHistory[]> {
    const params = { searchGb: 4, order_currency: currency, offset: page, count: limit };
    const result = await requestSign<IBithumbResponse<BithumbDepositHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
    );
    return depositHistoryConverter(result.data);
  }

  /* ------------------출금 내역 조회-------------------- */
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeWithdrawHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    const result = await requestSign<IBithumbResponse<BithumbWithdrawHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
    );
    return withdrawHistoryConverter(result.data);
  }

  public async fetchOrderHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeOrderHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    const result = await requestSign<IBithumbResponse<BithumbOrderHistory[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.info_user_transactions,
      this._headers(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, params),
      queystring.stringify(params),
    );
    return orderHistoryConverter(result.data);
  }

  private _headers(endpoint, parameters) {
    const nonce = new Date().getTime();
    const requestSignature = `${endpoint}${String.fromCharCode(0)}${queystring.stringify(parameters)}${String.fromCharCode(0)}${nonce}`;
    const hmacSignature = Buffer.from(
      crypto.createHmac("sha512", this.secretKey).update(requestSignature).digest("hex"),
    ).toString("base64");

    return {
      "Api-Key": this.connectKey,
      "Api-Sign": hmacSignature,
      "Api-Nonce": nonce,
    };
  }
}
