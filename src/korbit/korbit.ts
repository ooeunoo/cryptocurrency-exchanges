import {
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeOrderHistory,
  ExchangeDepositHistory,
  ExchangeWithdrawHistory,
} from "@exchange/exchange.interface";
import { KORBIT_BASE_URL, KORBIT_PUBLIC_DOMAIN } from "@korbit/korbit.constant";
import axios, { AxiosResponse } from "axios";
import { KorbitTicker } from "@korbit/koribt.interface";
import { marketConverter, marketPriceConverter } from "@korbit/korbit.converter";

export class Korbit {
  public async fetchMarkets(): Promise<ExchangeMarket[]> {
    try {
      const result = await this._request<KorbitTicker[]>(KORBIT_PUBLIC_DOMAIN.ticker);
      return marketConverter(result);
    } catch (e) {
      console.log(e);
    }
  }

  public async fetchMarketsPrices(markets: string[]): Promise<ExchangeMarketPrice[]> {
    markets;
    const result = await this._request<KorbitTicker[]>(KORBIT_PUBLIC_DOMAIN.ticker);
    return marketPriceConverter(result);
  }
  //   public fetchBalances(): Promise<ExchangeBalance[]> {
  //     throw new Error("Method not implemented.");
  //   }
  //   public fetchDepositAddress(
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
  private async _request<T>(
    endpoint: KORBIT_PUBLIC_DOMAIN,
    options?: { params?: any; pathParams?: string },
  ): Promise<T> {
    let url = `${KORBIT_BASE_URL}${endpoint}`;
    if (options?.pathParams) {
      url = `${url}/${options?.pathParams}`;
    }
    const res = <AxiosResponse<T>>await axios({
      method: "GET",
      url: url,
      params: options?.params,
    });
    return res.data;
  }
}
