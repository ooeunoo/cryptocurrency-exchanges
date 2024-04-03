import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from '../../../common/interfaces/exchange.private.interface'
import { method, requestAuth } from '../../../common/request/request'
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from '../../../common/constant'
import { KorbitShared } from '../shared/korbit.shared'
import { converter } from './korbit.private.converter'
import { constants } from '../../korbit.constants'
import {
  IKorbitBalance,
  IKorbitCompletedOrderHistory,
  IKorbitDepositAddress,
  IKorbitDepositHistory,
  IKorbitUnCompletedOrderHistory,
  IKorbitWithdrawHistory,
} from './korbit.private.interface'

export class KorbitPrivate extends KorbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey)
  }
  /* ------------------지갑 입출금 상태 조회-------------------- */
  public fetchWalletStatus(): Promise<IWalletStatus[]> {
    throw new Error('Method not implemented.')
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IBalance[]> {
    const result = await requestAuth<IKorbitBalance[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.balance,
      await this.header()
    )
    return converter.balance(result)
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(currency: string): Promise<IDepositAddress> {
    const result = await requestAuth<IKorbitDepositAddress[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.depositAddress,
      await this.header()
    )
    return converter.depositAddress(result, { currency })
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IDepositWithdrawHistory[] | null> {
    const params = { currency, type: 'deposit', offset: page - 1, limit }
    const result = await requestAuth<IKorbitDepositHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.depositHistory,
      await this.header(),
      {
        params,
      }
    )
    return converter.depositHistory(result)
  }

  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IDepositWithdrawHistory[]> {
    const params = { currency, type: 'withdrawal', offset: page - 1, limit }
    const result = await requestAuth<IKorbitWithdrawHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.withdrawHistory,
      await this.header(),
      {
        params,
      }
    )
    return converter.withdrawHistory(result)
  }

  public async fetchCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IOrderHistory[]> {
    const params = { offset: page - 1, limit, status: 'filled' }
    const result = await requestAuth<IKorbitCompletedOrderHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.completedOrderHistory,
      await this.header(),
      {
        params,
      }
    )
    return converter.completedOrderHistory(result)
  }

  public async fetchUnCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IOrderHistory[]> {
    const params = {
      offset: page - 1,
      limit,
      status: ['unfilled', 'partially_filled'],
    }
    const result = await requestAuth<IKorbitUnCompletedOrderHistory[]>(
      method.get,
      constants.apiUrl,
      constants.endpoints.unCompletedOrderHistory,
      await this.header(),
      {
        params,
      }
    )
    return converter.unCompletedOrderHistory(result)
  }
}
