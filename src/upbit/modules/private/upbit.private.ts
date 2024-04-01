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
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";
import { constants } from "../../upbit.constants";

export class UpbitPrivate extends UpbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  fetchWalletStatus(): Promise<IWalletStatus[]> {
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.walletStatus, this.header(), {
      converter: converter.walletStatus,
    });
  }

  fetchBalance(): Promise<IBalance[]> {
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.balance, this.header(), { converter: converter.balance });
  }

  fetchDepositAddress(): Promise<IDepositAddress[]> {
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.depositAddress, this.header(), {
      converter: converter.depositAddress,
    });
  }

  fetchDepositHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.depositHistory, this.header({ params }), {
      params,
      converter: converter.depositHistory,
    });
  }

  fetchWithdrawHistory(currency: string, page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.withdrawHistory, this.header({ params }), {
      params,
      converter: converter.withdrawHistory,
    });
  }

  public fetchCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["done", "cancel"] };
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.completedOrderHistory, this.header({ params }), {
      params,
      converter: converter.completedOrderHistory,
    });
  }
  public fetchUnCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["wait", "watch"] };
    return requestAuth(method.get, constants.apiUrl, constants.endpoints.unCompletedOrderHistory, this.header({ params }), {
      params,
      converter: converter.unCompletedOrderHistory,
    });
  }
}
