import * as queystring from 'querystring'
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from '../../../common/interfaces/exchange.private.interface'
import { method, request, requestAuth } from '../../../common/request/request'
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from '../../../common/constant'
import { converter } from './bithumb.private.converter'
import { BithumbShared } from '../shared/bithumb.shared'
import { constants } from '../../bithumb.constant'
import { IBithumbResponse } from '../shared/bithumb.shared.interface'
import {
  IBithumbBalance,
  IBithumbDepositHistory,
  IBithumbWalletStatus,
  IBithumbWithdrawHistory,
} from './bithumb.private.interface'

export class BithumbPrivate extends BithumbShared implements IExchangePrivate {
  constructor(connectKey: string, secretKey: string) {
    super(connectKey, secretKey)
  }

  fetchCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error('Method not implemented.')
  }
  fetchUnCompletedOrderHistory(): Promise<IOrderHistory[]> {
    throw new Error('Method not implemented.')
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<IWalletStatus[]> {
    const result = await request<IBithumbResponse<IBithumbWalletStatus[]>>(
      method.get,
      constants.apiUrl,
      constants.endpoints.walletStatus
    )
    return converter.walletStatus(result)
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IBalance[]> {
    const params = { currency: 'ALL' }
    const result = await requestAuth<IBithumbResponse<IBithumbBalance[]>>(
      method.post,
      constants.apiUrl,
      constants.endpoints.balance,
      this.header({
        endpoint: constants.endpoints.balance,
        parameters: params,
      }),
      {
        data: queystring.stringify(params),
      }
    )
    return converter.balance(result)
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(
    currency: string,
    network?: string
  ): Promise<IDepositAddress> {
    const params = { currency, net_type: network }

    const result = await requestAuth(
      method.post,
      constants.apiUrl,
      constants.endpoints.depositAddress,
      this.header({
        endpoint: constants.endpoints.depositAddress,
        parameters: params,
      }),
      {
        data: queystring.stringify(params),
      }
    )
    return converter.depositAddress(result)
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IDepositWithdrawHistory[]> {
    const params = {
      searchGb: 0,
      order_currency: currency,
      payment_currency: 'KRW',
      offset: page - 1,
      count: limit,
    }
    const result = await requestAuth<
      IBithumbResponse<IBithumbDepositHistory[]>
    >(
      method.post,
      constants.apiUrl,
      constants.endpoints.depositHistory,
      this.header({
        endpoint: constants.endpoints.depositHistory,
        parameters: params,
      }),
      {
        data: queystring.stringify(params),
      }
    )
    return converter.depositHistory(result)
  }

  /* ------------------출금 내역 조회-------------------- */
  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IDepositWithdrawHistory[]> {
    const params = {
      searchGb: 5,
      order_currency: currency,
      payment_currency: 'KRW',
      offset: page,
      count: limit,
    }
    const result = await requestAuth<
      IBithumbResponse<IBithumbWithdrawHistory[]>
    >(
      method.post,
      constants.apiUrl,
      constants.endpoints.withdrawHistory,
      this.header({
        endpoint: constants.endpoints.withdrawHistory,
        parameters: params,
      }),
      {
        data: queystring.stringify(params),
      }
    )
    return converter.withdrawHistory(result)
  }
}
