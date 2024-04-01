import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { UpbitShared } from "../shared/upbit.shared";
import { method, requestAuth } from "../../../common/requests";
import { converter } from "./upbit.private.converter";
import { IUpbitDepositAddress } from "./upbit.private.interface";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";

export class UpbitPrivate extends UpbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  fetchWalletStatus(): Promise<IWalletStatus[]> {
    return requestAuth(method.get, this.apiUrl, this.endpoints.walletStatus, this.header(), {
      converter: converter.walletStatus,
    });
  }

  fetchBalance(): Promise<IBalance[]> {
    return requestAuth(method.get, this.apiUrl, this.endpoints.balance, this.header(), { converter: converter.balance });
  }

  fetchDepositAddress(): Promise<IDepositAddress[]> {
    return requestAuth(method.get, this.apiUrl, this.endpoints.depositAddress, this.header(), {
      converter: converter.depositAddress,
    });
  }

  fetchDepositHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestAuth(method.get, this.apiUrl, this.endpoints.depositHistory, this.header({ params }), {
      params,
      converter: converter.depositHistory,
    });
  }

  fetchWithdrawHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestAuth(method.get, this.apiUrl, this.endpoints.withdrawHistory, this.header({ params }), {
      params,
      converter: converter.withdrawHistory,
    });
  }

  public fetchCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["done", "cancel"] };
    return requestAuth(method.get, this.apiUrl, this.endpoints.completedOrderHistory, this.header({ params }), {
      params,
      converter: converter.completedOrderHistory,
    });
  }
  public fetchUnCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["wait", "watch"] };
    return requestAuth(method.get, this.apiUrl, this.endpoints.unCompletedOrderHistory, this.header({ params }), {
      params,
      converter: converter.unCompletedOrderHistory,
    });
  }
}
