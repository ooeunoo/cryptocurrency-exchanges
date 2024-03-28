import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as queystring from "querystring";
import * as crypto from "crypto";
import { Exchange } from "../exchange";
import { UPBIT_BASE_URL, UPBIT_PRIVATE_ENDPOINT, UPBIT_PUBLIC_ENDPOINT } from "./upbit.constant";
import { Market } from "../interface/market";
import { Balance } from "../interface/balance";
import { WithdrawHistory } from "src/interface/withdrawHistory";
import { DepositHistory } from "src/interface/depositHistory";
import { DepositAddress } from "src/interface/depositAddress";
import { OrderHistory } from "src/interface/orderHistory";
import {
  balanceConverter,
  depositAddressesConverter,
  depositHistoryConverter,
  marketConverter,
  orderHistoryConverter,
  withdrawHistoryConverter,
} from "./upbit.converter";
import { UpbitBalance, UpbitDepositAddress, UpbitDepositHistory, UpbitMarket, UpbitOrderHistory, UpbitWithdrawHistory } from "./upbit.interface";

export class Upbit extends Exchange {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey?: string, secretKey?: string) {
    super();
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<Market[]> {
    const result = await this._request<UpbitMarket[]>(UPBIT_PUBLIC_ENDPOINT.market_all);
    return marketConverter(result);
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(params?: { currency?: string }): Promise<Balance[]> {
    const result = await this.__requestGetWithSign<UpbitBalance[]>(UPBIT_PRIVATE_ENDPOINT.balance, { params });
    return balanceConverter(result);
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(params: { currency: string; network: string }): Promise<DepositAddress> {
    const query: any = {};

    if (params?.currency) {
      query.currency = params.currency;
    }

    if (params?.network) {
      query.net_type = params.network;
    }

    const result = await this.__requestGetWithSign<UpbitDepositAddress>(UPBIT_PRIVATE_ENDPOINT.deposit_coin_address, {
      params: query,
    });
    return depositAddressesConverter(result);
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    params: { currency: string; page: number; limit: number } = { currency: "KRW", page: 1, limit: 10 },
  ): Promise<DepositHistory[]> {
    const result = await this.__requestGetWithSign<UpbitDepositHistory[]>(UPBIT_PRIVATE_ENDPOINT.deposits, { params });
    return depositHistoryConverter(result);
  }

  /* ------------------출금 내역 조회-------------------- */
  public async fetchWithdrawHistory(params?: { currency?: string; page?: number; limit?: number }): Promise<WithdrawHistory[]> {
    const result = await this.__requestGetWithSign<UpbitWithdrawHistory[]>(UPBIT_PRIVATE_ENDPOINT.withdraws, {
      params,
    });
    return withdrawHistoryConverter(result);
  }

  /* ------------------주문 내역 조회-------------------- */
  public async fetchOrderHistory(params?: { currency?: string; page?: number; limit?: number }): Promise<OrderHistory[]> {
    const result = await this.__requestGetWithSign<UpbitOrderHistory[]>(UPBIT_PRIVATE_ENDPOINT.order, { params });
    return orderHistoryConverter(result);
  }

  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  /* -------------------------------------- */
  private async _request<T>(endpoint: UPBIT_PUBLIC_ENDPOINT, options?: { params?: any; pathParams?: string }): Promise<T> {
    const res = <AxiosResponse<T>>await axios({
      method: "GET",
      url: `${UPBIT_BASE_URL}/${endpoint}/${options?.pathParams || ""}`,
      params: options?.params,
    });
    return res.data;
  }

  private async __requestGetWithSign<T>(endpoint: UPBIT_PRIVATE_ENDPOINT, options?: { params?: any }): Promise<T> {
    const headers = this._getHeader(options?.params);
    const res = <AxiosResponse<T>>await axios({
      method: "GET",
      url: `${UPBIT_BASE_URL}/${endpoint}`,
      params: options?.params,
      headers,
    });
    return res.data;
  }

  private _getHeader(params?: any) {
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
