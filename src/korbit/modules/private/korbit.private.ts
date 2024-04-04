import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from '../../../exchange/interfaces/exchange.private.interface'
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
import { responseWarp } from '../../../common/response/response'
import { Exchange } from '../../../exchange/enums/exchange.enum'
import { IResponse } from '../../../common/response/response.interface'

export class KorbitPrivate extends KorbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey)
  }
  /* ------------------지갑 입출금 상태 조회-------------------- */
  public fetchWalletStatus(): Promise<IResponse<IWalletStatus[]>> {
    return responseWarp(() => {
      throw new Error('Method not implemented.')
    }, Exchange.korbit)
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IResponse<IBalance[]>> {
    return responseWarp(async () => {
      const result = await requestAuth<IKorbitBalance[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.balance,
        await this.header()
      )
      return converter.balance(result)
    }, Exchange.korbit)
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(
    currency: string
  ): Promise<IResponse<IDepositAddress>> {
    return responseWarp(async () => {
      const result = await requestAuth<IKorbitDepositAddress[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.depositAddress,
        await this.header()
      )
      return converter.depositAddress(result, { currency })
    }, Exchange.korbit)
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[] | null>> {
    return responseWarp(async () => {
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
    }, Exchange.korbit)
  }

  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[]>> {
    return responseWarp(async () => {
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
    }, Exchange.korbit)
  }

  public async fetchCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(async () => {
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
    }, Exchange.korbit)
  }

  public async fetchUnCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(async () => {
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
    }, Exchange.korbit)
  }
}
