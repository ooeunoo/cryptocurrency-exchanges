import { v4 as uuidv4 } from 'uuid'
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivate,
  IOrderHistory,
  IWalletStatus,
} from '../../../exchange/interfaces/exchange.private.interface'
import { method, request, requestAuth } from '../../../common/request/request'
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from '../../../common/constant'
import { converter } from './coinone.private.converter'
import { CoinoneShared } from '../shared/coinone.shared'
import { constants } from '../../coinone.constants'
import {
  ICoinoneBalance,
  ICoinoneDepositHistory,
  ICoinoneHistoryTransaction,
  ICoinoneWalletStatus,
} from './coinone.private.interface'
import { IKorbitDepositAddress } from '../../../korbit/modules/private/korbit.private.interface'
import { IResponse } from '../../../common/response/response.interface'
import { responseWarp } from '../../../common/response/response'
import { Exchange } from '../../../exchange/enums/exchange.enum'

export class CoinonePrivate extends CoinoneShared implements IExchangePrivate {
  constructor(accessKey: string, secretKey: string) {
    super(accessKey, secretKey)
  }
  fetchCompletedOrderHistory(): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(() => {
      throw new Error('Method not implemented.')
    }, Exchange.coinone)
  }
  fetchUnCompletedOrderHistory(): Promise<IResponse<IOrderHistory[]>> {
    return responseWarp(() => {
      throw new Error('Method not implemented.')
    }, Exchange.coinone)
  }

  /* ------------------지갑 입출금 상태 조회-------------------- */
  public async fetchWalletStatus(): Promise<IResponse<IWalletStatus[]>> {
    return responseWarp(async () => {
      const result = await request<ICoinoneWalletStatus[]>(
        method.get,
        constants.apiUrl,
        constants.endpoints.walletStatus
      )
      return converter.walletStatus(result)
    }, Exchange.coinone)
  }

  /* ------------------잔액 조회-------------------- */
  public async fetchBalance(): Promise<IResponse<IBalance[]>> {
    return responseWarp(async () => {
      const data = {
        access_token: this.accessKey,
        nonce: uuidv4(),
      }
      const result = await requestAuth<ICoinoneBalance[]>(
        method.post,
        constants.apiUrl,
        constants.endpoints.balance,
        this.header({ payload: data }),
        {
          data: JSON.stringify(data),
        }
      )
      return converter.balance(result)
    }, Exchange.coinone)
  }

  /* ------------------입금 주소 조회-------------------- */
  public async fetchDepositAddress(
    currency: string,
    network?: string
  ): Promise<IResponse<IDepositAddress>> {
    // eslint //
    return responseWarp(async () => {
      network
      const data = {
        access_token: this.accessKey,
        nonce: new Date().getTime(),
      }

      const result = await requestAuth<IKorbitDepositAddress[]>(
        method.post,
        constants.apiUrl,
        constants.endpoints.depositAddress,
        this.header({ payload: data }),
        {
          data: JSON.stringify(data),
        }
      )

      return converter.depositAddress(result, { currency })
    }, Exchange.coinone)
  }

  /* ------------------입금 내역 조회-------------------- */
  public async fetchDepositHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[]>> {
    return responseWarp(async () => {
      const DEFAULT_SIZE = 100
      const totals = page * limit
      const [quotient, remainder] = [
        Math.floor(totals / DEFAULT_SIZE) + 1,
        totals % DEFAULT_SIZE,
      ]

      const payload: Record<string, unknown> = {
        access_token: this.accessKey,
        nonce: uuidv4(),
        currency,
        is_deposit: true,
        size: DEFAULT_SIZE,
      }
      let latestResult: ICoinoneHistoryTransaction[] = null

      while (quotient > 0) {
        const histories: ICoinoneDepositHistory = await requestAuth(
          method.post,
          constants.apiUrl,
          constants.endpoints.depositHistory,
          this.header({ payload }),
          {
            data: JSON.stringify(payload),
          }
        )

        if (histories.transactions.length == 0) {
          return []
        }

        latestResult = histories.transactions
        payload.from_ts = latestResult[-1].created_at
      }

      return converter.depositHistory(latestResult.slice(remainder, limit + 1))
    }, Exchange.coinone)
  }

  public async fetchWithdrawHistory(
    currency: string,
    page: number = DEFAULT_PAGE_NUMBER,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Promise<IResponse<IDepositWithdrawHistory[]>> {
    return responseWarp(async () => {
      const DEFAULT_SIZE = 100
      const totals = page * limit
      const [quotient, remainder] = [
        Math.floor(totals / DEFAULT_SIZE) + 1,
        totals % DEFAULT_SIZE,
      ]

      const payload: Record<string, unknown> = {
        access_token: this.accessKey,
        nonce: uuidv4(),
        currency,
        is_deposit: false,
        size: DEFAULT_SIZE,
      }
      let latestResult: ICoinoneHistoryTransaction[] = null

      while (quotient > 0) {
        const histories: ICoinoneDepositHistory = await requestAuth(
          method.post,
          constants.apiUrl,
          constants.endpoints.depositHistory,
          this.header({ payload }),
          {
            data: JSON.stringify(payload),
          }
        )

        if (histories.transactions.length == 0) {
          return []
        }

        latestResult = histories.transactions
        payload.from_ts = latestResult[-1].created_at
      }

      return converter.withdrawHistory(latestResult.slice(remainder, limit + 1))
    }, Exchange.coinone)
  }
}
