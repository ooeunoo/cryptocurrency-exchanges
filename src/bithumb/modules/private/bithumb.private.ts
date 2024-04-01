import * as queystring from "querystring";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
} from "../../../common/interfaces/exchange.private.interface";
import { method, request, requestAuth } from "../../../common/requests";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";
import { converter } from "./bithumb.private.converter";
import { BithumbShared } from "../shared/bithumb.shared";

export class BithumbPrivate extends BithumbShared implements IExchangePrivate {
  constructor(connectKey: string, secretKey: string) {
    super(connectKey, secretKey);
  }
  fetchCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error("Method not implemented.");
  }
  fetchUnCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error("Method not implemented.");
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<any[]> {
    return request(method.get, this.apiUrl, this.endpoints.walletStatus, { converter: converter.walletStatus });
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IBalance[]> {
    const params = { currency: "ALL" };
    return requestAuth(method.post, this.apiUrl, this.endpoints.balance, this.header({ endpoint: this.endpoints.balance, parameters: params }), {
      data: queystring.stringify(params),
      converter: converter.balance,
    });
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(): Promise<IDepositAddress[]> {
    const supports: any = await request(method.get, this.apiUrl, this.endpoints.walletStatus);
    const requests: any = [];
    supports.data.forEach(async ({ currency, net_type, deposit_status, withdrawal_status }: any) => {
      if (deposit_status == 1 && withdrawal_status == 1) {
        const params = { currency, net_type };
        requests.push(
          requestAuth(
            method.post,
            this.apiUrl,
            this.endpoints.depositAddress,
            this.header({ endpoint: this.endpoints.depositAddress, parameters: params }),
            {
              data: queystring.stringify(params),
              converter: converter.depositAddress,
            },
          ),
        );
      }
    });
    const results = await Promise.allSettled(requests);
    return results
      .filter(({ status }) => status == "fulfilled")
      .map((result: any) => {
        return result.value;
      });
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { searchGb: 0, order_currency: currency, payment_currency: "KRW", offset: page - 1, count: limit };
    return requestAuth(
      method.post,
      this.apiUrl,
      this.endpoints.depositHistory,
      this.header({ endpoint: this.endpoints.depositHistory, parameters: params }),
      {
        data: queystring.stringify(params),
        converter: converter.depositHistory,
      },
    );
  }

  /* ------------------출금 내역 조회-------------------- */
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { searchGb: 5, order_currency: currency, offset: page, count: limit };
    return requestAuth(
      method.post,
      this.apiUrl,
      this.endpoints.withdrawHistory,
      this.header({ endpoint: this.endpoints.withdrawHistory, parameters: params }),
      {
        data: queystring.stringify(params),
        converter: converter.withdrawHistory,
      },
    );
  }
}
