import { v4 as uuidv4 } from "uuid";
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from "../../../common/interfaces/exchange.private.interface";
import { method, request, requestAuth } from "../../../common/requests";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../../../common/constant";
import { converter } from "./coinone.private.converter";
import { CoinoneShared } from "../shared/coinone.shared";
import { constants } from "../../coinone.constants";

export class CoinonePrivate extends CoinoneShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey);
  }
  fetchCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error("Method not implemented.");
  }
  fetchUnCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error("Method not implemented.");
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<IWalletStatus[]> {
    return request(method.get, constants.apiUrl, constants.endpoints.walletStatus, {
      converter: converter.walletStatus,
    });
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IBalance[]> {
    const data = {
      access_token: this.accessKey,
      nonce: uuidv4(),
    };
    return requestAuth(method.post, constants.apiUrl, constants.endpoints.balance, this.header({ payload: data }), {
      data: JSON.stringify(data),
      converter: converter.balance,
    });
  }

  /* ------------------입금 주소 조회-------------------- */
  public fetchDepositAddress(): Promise<IDepositAddress[]> {
    const data = {
      access_token: this.accessKey,
      nonce: new Date().getTime(),
    };
    return requestAuth(method.post, constants.apiUrl, constants.endpoints.depositAddress, this.header({ payload: data }), {
      data: JSON.stringify(data),
      converter: converter.depositAddress,
    });
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const DEFAULT_SIZE = 100;
    const totals = page * limit;
    const [quotient, remainder] = [Math.floor(totals / DEFAULT_SIZE) + 1, totals % DEFAULT_SIZE];

    const data: any = {
      access_token: this.accessKey,
      nonce: uuidv4(),
      currency,
      is_deposit: true,
      size: DEFAULT_SIZE,
    };
    let latestResult = null;

    while (quotient > 0) {
      latestResult = await requestAuth(method.post, constants.apiUrl, constants.endpoints.depositHistory, this.header({ payload: data }), {
        data: JSON.stringify(data),
        converter: converter.depositHistory,
      });

      if (latestResult.length == 0) {
        return [];
      }

      data.from_ts = latestResult[-1].created_at;
    }

    return latestResult.slice(remainder, limit + 1);
  }

  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<IDepositWithdrawHistory[]> {
    const DEFAULT_SIZE = 100;
    const totals = page * limit;
    const [quotient, remainder] = [Math.floor(totals / DEFAULT_SIZE) + 1, totals % DEFAULT_SIZE];

    const data: any = {
      access_token: this.accessKey,
      nonce: uuidv4(),
      currency,
      is_deposit: false,
      size: DEFAULT_SIZE,
    };
    let latestResult = null;

    while (quotient > 0) {
      latestResult = await requestAuth(method.post, constants.apiUrl, constants.endpoints.withdrawHistory, this.header({ payload: data }), {
        data: JSON.stringify(data),
        converter: converter.withdrawHistory,
      });

      if (latestResult.length == 0) {
        return [];
      }

      data.from_ts = latestResult[-1].created_at;
    }

    return latestResult.slice(remainder, limit + 1);
  }
}
