import {
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeOrderHistory,
  ExchangeDepositHistory,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import { KORBIT_AUTH_DOMAIN, KORBIT_BASE_URL, KORBIT_PRIVATE_DOMAIN, KORBIT_PUBLIC_DOMAIN } from "@korbit/korbit.constant";
import axios, { AxiosResponse } from "axios";
import { KorbitOAuth, KorbitOAuthData, KorbitTicker } from "@korbit/koribt.interface";
import { marketConverter, marketPriceConverter } from "@korbit/korbit.converter";
import { Method, requestPublic, requestSign } from "@common/requests";
import { CREDENTITAL_NOT_SETTED } from "@common/error";
import * as queystring from "querystring";

function KorbitPrivate(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.api || !this.secretKey) {
      throw new Error(CREDENTITAL_NOT_SETTED);
    }
    return originalMethod.apply(this, args);
  };
}

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

  public async fetchMarkets(): Promise<ExchangeMarket[]> {
    return requestPublic<KorbitTicker[]>(Method.GET, KORBIT_BASE_URL, KORBIT_PUBLIC_DOMAIN.ticker, null, null, marketConverter);
  }

  public async fetchMarketsPrices(markets: string[]): Promise<ExchangeMarketPrice[]> {
    markets;
    return requestPublic<KorbitTicker[]>(Method.GET, KORBIT_BASE_URL, KORBIT_PUBLIC_DOMAIN.ticker, null, null, marketPriceConverter);
  }

  public async fetchBalances(): Promise<any> {
    const headers = await this._header();
    console.log(headers);
    return requestSign(Method.GET, KORBIT_BASE_URL, KORBIT_PRIVATE_DOMAIN.balance, await this._header(), null, null);
  }

  // public fetchDepositAddress(
  //     currency: string,
  //     network: string,
  //   ): Promise<ExchangeDepositAddress> {
  //     // throw new Error("Method not implemented.");
  //   }
  //   public fetchOrderHistory(
  //     currency: string,
  //     page: number,
  //     limit: number,
  //   ): Promise<ExchangeOrderHistory[]> {
  //     throw new Error("Method not implemented.");
  //   }
  //   public fetchDepositHistory(
  //     currency: string,
  //     page: number,
  //     limit: number,
  //   ): Promise<ExchangeDepositHistory[]> {
  //     throw new Error("Method not implemented.");
  //   }
  //   public fetchWithdrawHistory(
  //     currency: string,
  //     page: number,
  //     limit: number,
  //   ): Promise<ExchangeWithdrawHistory[]> {
  //     throw new Error("Method not implemented.");
  //   }

  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  // curl -D - -X POST -d "
  // client_id=$CLIENT_ID&
  // client_secret=$CLIENT_SECRET&
  // grant_type=client_credentials"

  private async _header() {
    if (this.accessToken == null || this.expiresIn == null || this.expiresIn < new Date().getTime()) {
      await this._refreshAccessToken();
    }

    return { Authorization: `Bearer ${this.accessToken}` };
  }
  private async _refreshAccessToken() {
    console.log("in");
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
