import { BITHUMB_BASE_URL, BITHUMB_PRIVATE_DOMAIN, BITHUMB_PUBLIC_DOMAIN } from "@bithumb/bithumb.constant";
import {
  bithumbBalanceConverter,
  bithumbMarketTickerConverterBTC,
  bithumbMarketTickerConverterKRW,
  bithumbWalletStatusConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  orderHistoryConverter,
  withdrawHistoryConverter,
} from "@bithumb/bithumb.converter";
import {
  IBithumbBalance,
  IBithumbDepositAddress,
  IBithumbDepositHistory,
  IBithumbOrderHistory,
  IBithumbTicker,
  IBithumbWalletStatus,
  IBithumbWithdrawHistory,
  IBithumbResponse,
} from "@bithumb/bithumb.interface";
import * as queystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "@exchange/exchange";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";
import {
  IBalance,
  IDepositAddress,
  ExchangeDepositHistory,
  IMarket,
  IMarketPrice,
  IOrderHistory,
  ITicker,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";

export class Bithumb extends Exchange {
  private connectKey: string;
  private secretKey: string;

  constructor(connectKey?: string, secretKey?: string) {
    super();
    this.connectKey = connectKey;
    this.secretKey = secretKey;
  }

  /* ------------------마켓 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const resultkrw = await requestPublic<IBithumbResponse<IBithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_KRW",
      null,
      null,
      bithumbMarketTickerConverterKRW,
    );
    const resultbtc = await requestPublic<IBithumbResponse<IBithumbTicker[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.ticker + "/ALL_BTC",
      null,
      null,
      bithumbMarketTickerConverterBTC,
    );
    return resultkrw.concat(resultbtc);
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<any[]> {
    return requestPublic<IBithumbResponse<IBithumbWalletStatus[]>>(
      Method.GET,
      BITHUMB_BASE_URL,
      BITHUMB_PUBLIC_DOMAIN.support_networks,
      null,
      null,
      bithumbWalletStatusConverter,
    );
  }

  /* ------------------잔액 조회-------------------- */
  @bithumbPrivate
  public async fetchBalances(): Promise<IBalance[]> {
    const params = { currency: "ALL" };
    return requestSign<IBithumbResponse<IBithumbBalance[]>>(
      Method.POST,
      BITHUMB_BASE_URL,
      BITHUMB_PRIVATE_DOMAIN.balance,
      this._headers(BITHUMB_PRIVATE_DOMAIN.balance, params),
      queystring.stringify(params),
      null,
      bithumbBalanceConverter,
    );
  }

  /* ------------------입금 주소 조회-------------------- */
  @bithumbPrivate
  public async fetchDepositAddresses(): Promise<IDepositAddress[]> {
    const supports = await requestPublic(Method.GET, BITHUMB_BASE_URL, BITHUMB_PUBLIC_DOMAIN.support_networks, null, null);

    const requests = [];
    supports.data.forEach(async ({ currency, net_type }) => {
      const params = { currency, net_type };
      requests.push(
        requestSign<IBithumbResponse<IBithumbDepositAddress>>(
          Method.POST,
          BITHUMB_BASE_URL,
          BITHUMB_PRIVATE_DOMAIN.deposit_address,
          this._headers(BITHUMB_PRIVATE_DOMAIN.deposit_address, params),
          queystring.stringify(params),
          null,
          depositAddressesConverter,
        ),
      );
    });
    const results = await Promise.allSettled(requests);
    return results
      .filter(({ status }) => status == "fulfilled")
      .map((result: any) => {
        return result.value;
      });
  }

  /* ------------------입금 내역 조회-------------------- */
  @bithumbPrivate
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeDepositHistory[]> {
    const params = { searchGb: 4, order_currency: currency, offset: page - 1, count: limit };
    return requestSign<IBithumbResponse<IBithumbDepositHistory[]>>(
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
  @bithumbPrivate
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<ExchangeWithdrawHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    return requestSign<IBithumbResponse<IBithumbWithdrawHistory[]>>(
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
  @bithumbPrivate
  public async fetchOrderHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    return requestSign<IBithumbResponse<IBithumbOrderHistory[]>>(
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
  private _headers(endpoint: string, parameters?: any) {
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

function bithumbPrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.connectKey || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}
