import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { method, requestAuth } from "../../../common/requests";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";
import { KorbitShared } from "../shared/korbit.shared";
import { converter } from "./korbit.private.converter";

export class KorbitPrivate extends KorbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }
  /* ------------------지갑 입출금 상태 조회-------------------- */
  public fetchWalletStatus(): Promise<IWalletStatus[]> {
    throw new Error("Method not implemented.");
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IBalance[]> {
    return requestAuth(method.get, this.apiUrl, this.endpoints.balance, await this.header(), { converter: converter.balance });
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(): Promise<IDepositAddress[]> {
    return requestAuth(method.get, this.apiUrl, this.endpoints.depositAddress, await this.header(), { converter: converter.depositAddress });
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, type: "deposit", offset: page - 1, limit };
    return requestAuth(method.get, this.apiUrl, this.endpoints.depositHistory, await this.header(), {
      params,
      converter: converter.depositHistory,
    });
  }

  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, type: "withdrawal", offset: page - 1, limit };
    return requestAuth(method.get, this.apiUrl, this.endpoints.withdrawHistory, await this.header(), {
      params,
      converter: converter.withdrawHistory,
    });
  }

  public async fetchCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { offset: page - 1, limit, status: "filled" };
    return requestAuth(method.get, this.apiUrl, this.endpoints.completedOrderHistory, await this.header(), {
      params,
      converter: converter.completedOrderHistory,
    });
  }

  public async fetchUnCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { offset: page - 1, limit, status: ["unfilled", "partially_filled"] };
    return requestAuth(method.get, this.apiUrl, this.endpoints.unCompletedOrderHistory, await this.header(), {
      params,
      converter: converter.unCompletedOrderHistory,
    });
  }
}
