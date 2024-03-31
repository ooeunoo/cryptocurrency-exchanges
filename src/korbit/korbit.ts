import {
  IMarket,
  IMarketPrice,
  IBalance,
  IDepositAddress,
  IOrderHistory,
  ITicker,
  IDepositWithdrawHistory,
  IWalletStatus,
} from "@exchange/exchange.interface";
import { KORBIT_AUTH_ENDPOINT, KORBIT_BASE_URL, KORBIT_PRIVATE_ENDPOINT, KORBIT_PUBLIC_ENDPOINT } from "@korbit/korbit.constant";
import axios, { AxiosResponse } from "axios";
import { IKorbitHistory, IKorbitMyAddresses, IKorbitOAuth, IKorbitOAuthData, IKorbitTicker } from "@korbit/koribt.interface";
import { korbitBalanceConverter, korbitDepositAddressesConverter, korbitTickerConverter } from "@korbit/korbit.converter";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";
import * as queystring from "querystring";
import { Exchange } from "@exchange/exchange";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@exchange/exchange.constant";

export class Korbit extends Exchange {
  public fetchOrderHistory(currency: string, page: number, limit: number): Promise<IOrderHistory[]> {
    throw new Error("Method not implemented.");
  }

  public fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]> {
    throw new Error("Method not implemented.");
  }
  public subscribePublicData(type: string) {
    throw new Error("Method not implemented.");
  }
  private apiKey?: string;
  private secretKey?: string;
  private accessToken?: string;
  private refresehToken?: string;
  private expiresIn?: number;

  constructor(apiKey?: string, secretKey?: string) {
    super();
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    return requestPublic<IKorbitTicker[]>(Method.GET, KORBIT_BASE_URL, KORBIT_PUBLIC_ENDPOINT.ticker, null, null, korbitTickerConverter);
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public fetchWalletStatus(): Promise<IWalletStatus[]> {
    throw new Error("Method not implemented.");
  }
  /* ------------------잔액 조회-------------------- */
  @korbitPrivate
  public async fetchBalances(): Promise<any> {
    return requestSign(Method.GET, KORBIT_BASE_URL, KORBIT_PRIVATE_ENDPOINT.balance, await this._header(), null, null, korbitBalanceConverter);
  }

  /* ------------------입금 주소 조회-------------------- */
  @korbitPrivate
  public async fetchDepositAddresses(): Promise<IDepositAddress[]> {
    return requestSign<IKorbitMyAddresses>(
      Method.GET,
      KORBIT_BASE_URL,
      KORBIT_PRIVATE_ENDPOINT.deposit_address,
      await this._header(),
      null,
      null,
      korbitDepositAddressesConverter,
    );
  }

  /* ------------------입금 내역 조회-------------------- */
  @korbitPrivate
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, offset: page - 1, limit };
    return requestSign<IKorbitHistory>(Method.GET, KORBIT_BASE_URL, KORBIT_PRIVATE_ENDPOINT.history, await this._header(), null, params);
  }

  private async _header() {
    if (this.accessToken == null || this.expiresIn == null || this.expiresIn < new Date().getTime()) {
      await this._refreshAccessToken();
    }

    return { Authorization: `Bearer ${this.accessToken}` };
  }
  private async _refreshAccessToken() {
    const data: IKorbitOAuthData = {
      client_id: this.apiKey,
      client_secret: this.secretKey,
      grant_type: "client_credentials",
    };

    if (this.refresehToken != null) {
      data.grant_type = "refresh_token";
      data.refresh_token = this.refresehToken;
    }
    const { access_token, expires_in, refresh_token } = await requestPublic<IKorbitOAuth>(
      Method.POST,
      KORBIT_BASE_URL,
      KORBIT_AUTH_ENDPOINT.oauth2,
      null,
      queystring.stringify(data as any),
    );

    this.accessToken = access_token;
    this.refresehToken = refresh_token;
    this.expiresIn = new Date().getTime() + expires_in;
  }
}

function korbitPrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.apiKey || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}
