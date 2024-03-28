import { Market } from "../interface/market";
import { BITHUMB_BASE_URL, BITHUMB_PRIVATE_DOMAIN, BITHUMB_PUBLIC_DOMAIN } from "./bithumb.constant";
import axios, { AxiosResponse } from "axios";
import { balanceConverter, depositAddressesConverter, depositHistoryConverter, marketConverter } from "./bithumb.converter";
import { BithumbBalance, BithumbDepositAddress, BithumbDepositHistory, BithumbTicker, IBithumbResponse } from "./bithumb.interface";
import * as queystring from "querystring";
import * as crypto from "crypto";
import { DepositAddress } from "../interface/depositAddress";
import { DepositHistory } from "src/interface/depositHistory";

export class Bithumb {
  private connectKey: string;
  private secretKey: string;

  constructor(connectKey?: string, secretKey?: string) {
    // super();
    this.connectKey = connectKey;
    this.secretKey = secretKey;
  }

  public async fetchMarkets(): Promise<Market[]> {
    const resultkrw = await this._request<BithumbTicker[]>(BITHUMB_PUBLIC_DOMAIN.ticker, { pathParams: "ALL_KRW" });
    const resultbtc = await this._request<BithumbTicker[]>(BITHUMB_PUBLIC_DOMAIN.ticker, { pathParams: "ALL_BTC" });
    return marketConverter(resultkrw, "KRW").concat(marketConverter(resultbtc, "BTC"));
  }

  public async fetchBalance(params: { currency: string } = { currency: "ALL" }): Promise<any> {
    const result = await this.requestPostWithSign<BithumbBalance[]>(BITHUMB_PRIVATE_DOMAIN.info_balanace, params);
    return balanceConverter(result);
  }

  public async fetchDepositAddress(params: { currency: string; network: string }): Promise<DepositAddress> {
    const query: any = {};

    if (params?.currency) {
      query.currency = params.currency;
    }

    if (params?.network) {
      query.net_type = params.network;
    }
    const result = await this.requestPostWithSign<BithumbDepositAddress>(BITHUMB_PRIVATE_DOMAIN.info_wallet_address, query);
    return depositAddressesConverter(result);
  }

  public async fetchDepositHistory(
    params: { page: number; limit: number; currency: string } = { page: 1, limit: 10, currency: "KRW" },
  ): Promise<DepositHistory[]> {
    try {
      const query: any = { searchGb: 4 };

      if (params.currency) {
        query.order_currency = params.currency;
      }

      if (params.page) {
        query.offset = params.page - 1;
      }

      if (params.limit) {
        query.count = params.limit;
      }

      console.log(params);
      const result = await this.requestPostWithSign<BithumbDepositHistory[]>(BITHUMB_PRIVATE_DOMAIN.info_user_transactions, query);
      console.log(result);
      return depositHistoryConverter(result);
    } catch (e) {
      console.log(e.response);
    }
  }
  // public fetchWithdrawHistory(params: {
  //   page?: number;
  //   limit?: number;
  //   currency?: string;
  // }): Promise<WithdrawHistory[]> {
  //   throw new Error("Method not implemented.");
  // }
  // public fetchDepositAddresses(params: {
  //   currency?: string;
  //   network?: string;
  // }): Promise<DepositAddress[]> {
  //   throw new Error("Method not implemented.");
  // }

  private async _request<T>(endpoint: BITHUMB_PUBLIC_DOMAIN, options?: { params?: any; pathParams?: string }): Promise<T> {
    const res = <AxiosResponse<IBithumbResponse<T>>>await axios({
      method: "GET",
      url: `${BITHUMB_BASE_URL}${endpoint}/${options?.pathParams || ""}`,
      params: options?.params,
    });
    return res.data.data;
  }

  private async requestPostWithSign<T>(endpoint: BITHUMB_PRIVATE_DOMAIN, params: any): Promise<T> {
    const param = Object.assign(params ?? {}, {
      payment_currency: "KRW",
    });
    const headers = this._getHeader(endpoint, param);
    const res = <AxiosResponse<IBithumbResponse<T>>>await axios({
      method: "POST",
      url: `${BITHUMB_BASE_URL}${endpoint}`,
      data: queystring.stringify(param),
      headers,
    });
    return res.data.data;
  }

  private _getHeader(endpoint, parameters) {
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
