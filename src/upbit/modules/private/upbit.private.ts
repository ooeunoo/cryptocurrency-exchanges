import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from '../../../exchange/interfaces/exchange.private.interface'
import { UpbitShared } from '../shared/upbit.shared'
import { method, requestAuth } from '../../../common/request/request'
import { converter } from './upbit.private.converter'
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from '../../../common/constant'
import { constants } from '../../upbit.constants'
import {
  IUpbitBalance,
  IUpbitCompletedOrderHistory,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitUnCompletedOrderHistory,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from './upbit.private.interface'
import { responseWarp } from '../../../common/response/response'
import { IResponse } from '../../../common/response/response.interface'
import { Exchange } from '../../../exchange/enums/exchange.enum'

export class UpbitPrivate extends UpbitShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey)
  }

  async fetchWalletStatus(): Promise<IResponse<IWalletStatus[]>> {
    return responseWarp(async () => {
      const result = await requestAuth<IUpbitWalletStatus[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.walletStatus,
        this.header()
      )
      return converter.walletStatus(result)
    }, Exchange.upbit)
  }

  async fetchBalance(): Promise<IResponse<IBalance[]>> {
    return responseWarp(async () => {
      const result = await requestAuth<IUpbitBalance[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.balance,
        this.header()
      )
      return converter.balance(result)
    }, Exchange.upbit)
  }

  async fetchDepositAddress(
    currency: string,
    network: string
  ): Promise<IResponse<IDepositAddress>> {
    return responseWarp(async () => {
      const params: Record<string, string> = { currency, net_type: network }
      const result = await requestAuth<IUpbitDepositAddress>(
        method.get,
        constants.apiUrl,
        constants.endpoints.depositAddress,
        this.header({ params }),
        { params }
      )
      return converter.depositAddress(result)
    }, Exchange.upbit)
  }

  async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[]>> {
    return responseWarp(async () => {
      const params = { currency, page, limit }
      const result = await requestAuth<IUpbitDepositHistory[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.depositHistory,
        this.header({ params }),
        {
          params,
        }
      )
      return converter.depositHistory(result)
    }, Exchange.upbit)
  }

  async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[]>> {
    return responseWarp(async () => {
      const params = { currency, page, limit }
      const result = await requestAuth<IUpbitWithdrawHistory[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.withdrawHistory,
        this.header({ params }),
        {
          params,
        }
      )
      return converter.withdrawHistory(result)
    }, Exchange.upbit)
  }

  public async fetchCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(async () => {
      const params = { page, limit, states: ['done', 'cancel'] }
      const result = await requestAuth<IUpbitCompletedOrderHistory[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.completedOrderHistory,
        this.header({ params }),
        {
          params,
        }
      )
      return converter.completedOrderHistory(result)
    }, Exchange.upbit)
  }
  public async fetchUnCompletedOrderHistory(
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(async () => {
      const params = { page, limit, states: ['wait', 'watch'] }
      const result = await requestAuth<IUpbitUnCompletedOrderHistory[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.unCompletedOrderHistory,
        this.header({ params }),
        {
          params,
        }
      )
      return converter.unCompletedOrderHistory(result)
    }, Exchange.upbit)
  }
}
