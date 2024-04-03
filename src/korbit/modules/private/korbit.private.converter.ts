import {
  DepositWithdrawType,
  DepsoitWithdrawState,
} from '../../../exchange/enums/exchange.private.enum'
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivateConverter,
  IOrderHistory,
  IWalletStatus,
} from '../../../exchange/interfaces/exchange.private.interface'
import { add, isGreaterThan, toBigNumberString } from '../../../utils/number'
import {
  IKorbitBalance,
  IKorbitDepositAddress,
  IKorbitDepositHistory,
  IKorbitWithdrawHistory,
} from './korbit.private.interface'

export const converter: IExchangePrivateConverter = {
  walletStatus: function (): IWalletStatus[] {
    throw new Error('Function not implemented.')
  },
  balance: function (data: IKorbitBalance): IBalance[] {
    const results: IBalance[] = []
    Object.keys(data).forEach((currency) => {
      const targetCurrency = data[currency]
      const balance = toBigNumberString(targetCurrency.available)
      const lockedBalance = add(
        targetCurrency.trade_in_use,
        targetCurrency.withdrawal_in_use
      ).toString()

      if (isGreaterThan(add(balance, lockedBalance), 0)) {
        results.push({
          currency: currency.toUpperCase(),
          balance: toBigNumberString(targetCurrency.available),
          lockedBalance: add(
            targetCurrency.trade_in_use,
            targetCurrency.withdrawal_in_use
          ).toString(),
          avgBuyPrice: toBigNumberString(targetCurrency.avg_price),
        })
      }
    })
    return results
  },
  depositAddress: function (
    data: IKorbitDepositAddress,
    { currency }: { currency: string }
  ): IDepositAddress | null {
    const depositAddresses = data.deposit

    const target = depositAddresses[currency.toLowerCase()]
    if (target == undefined) {
      return null
    }

    return {
      currency: currency,
      network: null,
      address: target.address,
      memo: target?.destination_tag ?? null,
    }
  },
  depositHistory: function (
    data: IKorbitDepositHistory[]
  ): IDepositWithdrawHistory[] {
    const convertState = (state: string): DepsoitWithdrawState => {
      switch (state) {
        case 'filled':
          return DepsoitWithdrawState.accepted
        case 'requested':
          return DepsoitWithdrawState.processing
        default:
          return DepsoitWithdrawState.unknown
      }
    }

    return data.map(
      ({ currency, amount, details, status, created_at, completed_at }) => {
        return {
          type: DepositWithdrawType.deposit,
          txId: details?.transaction_id,
          currency: currency.toUpperCase(),
          network: null,
          amount: toBigNumberString(amount),
          fee: null,
          state: convertState(status),
          fromAddress: details?.address ?? null,
          fromAddressTag: details?.destination_tag ?? null,
          toAddress: null,
          toAddressTag: null,
          createdAt: created_at,
          confirmedAt: completed_at,
        }
      }
    )
  },
  withdrawHistory: function (
    data: IKorbitWithdrawHistory[]
  ): IDepositWithdrawHistory[] {
    const convertState = (state: string): DepsoitWithdrawState => {
      switch (state) {
        case 'filled':
          return DepsoitWithdrawState.accepted
        case 'requested':
          return DepsoitWithdrawState.processing
        default:
          return DepsoitWithdrawState.unknown
      }
    }

    return data.map(
      ({ currency, amount, details, status, created_at, completed_at }) => {
        return {
          type: DepositWithdrawType.withdraw,
          txId: details?.transaction_id,
          currency: currency.toUpperCase(),
          network: null,
          amount: toBigNumberString(amount),
          fee: null,
          state: convertState(status),
          fromAddress: null,
          fromAddressTag: null,
          toAddress: details?.address ?? null,
          toAddressTag: details?.destination_tag ?? null,
          createdAt: created_at,
          confirmedAt: completed_at,
        }
      }
    )
  },
  completedOrderHistory: function (): IOrderHistory[] {
    throw new Error('Function not implemented.')
  },
  unCompletedOrderHistory: function (): IOrderHistory[] {
    throw new Error('Function not implemented.')
  },
}
