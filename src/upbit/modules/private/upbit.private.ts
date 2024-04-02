import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { UpbitShared } from "../shared/upbit.shared";
import { method, requestAuth } from "../../../common/request/request";
import { converter } from "./upbit.private.converter";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";
import { constants } from "../../upbit.constants";
import {
  IUpbitBalance,
  IUpbitCompletedOrderHistory,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitUnCompletedOrderHistory,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from "./upbit.private.interface";

export class UpbitPrivate extends UpbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }

  async fetchWalletStatus(): Promise<IWalletStatus[]> {
    const result = await requestAuth<IUpbitWalletStatus[]>(method.get, constants.apiUrl, constants.endpoints.walletStatus, this.header());
    return converter.walletStatus(result);
  }

  async fetchBalance(): Promise<IBalance[]> {
    const result = await requestAuth<IUpbitBalance[]>(method.get, constants.apiUrl, constants.endpoints.balance, this.header());
    return converter.balance(result);
  }

  async fetchDepositAddress(currency: string, network: string): Promise<IDepositAddress> {
    const params: Record<string, string> = { currency, net_type: network };
    const result = await requestAuth<IUpbitDepositAddress>(
      method.get,
      constants.apiUrl,
      constants.endpoints.depositAddress,
      this.header({ params }),
      { params },
    );
    return converter.depositAddress(result);
  }

  async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    const result = await requestAuth<IUpbitDepositHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.depositHistory,
      this.header({ params }),
      {
        params,
      },
    );
    return converter.depositHistory(result);
  }

  async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, page, limit };
    const result = await requestAuth<IUpbitWithdrawHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.withdrawHistory,
      this.header({ params }),
      {
        params,
      },
    );
    return converter.withdrawHistory(result);
  }

  public async fetchCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["done", "cancel"] };
    const result = await requestAuth<IUpbitCompletedOrderHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.completedOrderHistory,
      this.header({ params }),
      {
        params,
      },
    );
    return converter.completedOrderHistory(result);
  }
  public async fetchUnCompletedOrderHistory(page: number = DEFAULT_PAGE_NUMBER, limit: number = DEFAULT_PAGE_LIMIT): Promise<IOrderHistory[]> {
    const params = { page, limit, states: ["wait", "watch"] };
    const result = await requestAuth<IUpbitUnCompletedOrderHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.unCompletedOrderHistory,
      this.header({ params }),
      {
        params,
      },
    );
    return converter.unCompletedOrderHistory(result);
  }
}
