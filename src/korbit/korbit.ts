import {
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeOrderHistory,
  ExchangeDepositHistory,
  ExchangeWithdrawHistory,
  ExchangeTicker,
} from "@exchange/exchange.interface";
import { KORBIT_AUTH_DOMAIN, KORBIT_BASE_URL, KORBIT_PRIVATE_DOMAIN, KORBIT_PUBLIC_DOMAIN } from "@korbit/korbit.constant";
import axios, { AxiosResponse } from "axios";
import { KorbitMyAddresses, KorbitOAuth, KorbitOAuthData, KorbitTicker } from "@korbit/koribt.interface";
import { balanceConverter, depositAddressesConverter, korbitTickerConverter } from "@korbit/korbit.converter";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";
import * as queystring from "querystring";

export class Korbit {
  private apiKey?: string;
  private secretKey?: string;
  private accessToken?: string;
  private refresehToken?: string;
  private expiresIn?: number;

  constructor(apiKey?: string, secretKey?: string) {
    // super();
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ExchangeTicker[]> {
    return requestPublic<KorbitTicker[]>(Method.GET, KORBIT_BASE_URL, KORBIT_PUBLIC_DOMAIN.ticker, null, null, korbitTickerConverter);
  }

  /* ------------------잔액 조회-------------------- */
  @korbitPrivate
  public async fetchBalances(): Promise<any> {
    return requestSign(Method.GET, KORBIT_BASE_URL, KORBIT_PRIVATE_DOMAIN.balance, await this._header(), null, null, balanceConverter);
  }

  /* ------------------입금 주소 조회-------------------- */
  @korbitPrivate
  public async fetchDepositAddress(): Promise<ExchangeDepositAddress[]> {
    return requestSign<KorbitMyAddresses>(
      Method.GET,
      KORBIT_BASE_URL,
      KORBIT_PRIVATE_DOMAIN.deposit_address,
      await this._header(),
      null,
      null,
      depositAddressesConverter,
    );
  }

  private async _header() {
    if (this.accessToken == null || this.expiresIn == null || this.expiresIn < new Date().getTime()) {
      await this._refreshAccessToken();
    }

    return { Authorization: `Bearer ${this.accessToken}` };
  }
  private async _refreshAccessToken() {
    const data: KorbitOAuthData = {
      client_id: this.apiKey,
      client_secret: this.secretKey,
      grant_type: "client_credentials",
    };

    if (this.refresehToken != null) {
      data.grant_type = "refresh_token";
      data.refresh_token = this.refresehToken;
    }
    const { access_token, expires_in, refresh_token } = await requestPublic<KorbitOAuth>(
      Method.POST,
      KORBIT_BASE_URL,
      KORBIT_AUTH_DOMAIN.oauth2,
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
    if (!this.api || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}
