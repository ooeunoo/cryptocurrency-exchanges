import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IOrderHistory,
  IWalletStatus,
} from '../../../exchange/interfaces/exchange.private.interface'
import { toBigNumberString } from '../../../utils/number'
import {
  IUpbitBalance,
  IUpbitCompletedOrderHistory,
  IUpbitDepositAddress,
  IUpbitDepositHistory,
  IUpbitUnCompletedOrderHistory,
  IUpbitWalletStatus,
  IUpbitWithdrawHistory,
} from './upbit.private.interface'

import { toTimestamp } from '../../../utils/time'
import {
  DepositWithdrawType,
  DepsoitWithdrawState,
  OrderSide,
  OrderState,
  OrderType,
} from '../../../exchange/enums/exchange.private.enum'

export const converter = {
  walletStatus: (data: IUpbitWalletStatus[]): IWalletStatus[] => {
    return data.map(({ currency, wallet_state, net_type }) => {
      let deposit = false
      let withdraw = false

      switch (wallet_state) {
        case 'working':
          deposit = true
          withdraw = true
          break
        case 'withdraw_only':
          withdraw = true
          break
        case 'deposit_only':
          deposit = true
          break
        case 'paused':
        case 'unsupported':
          break
      }

      return {
        currency: currency.toUpperCase(),
        network: net_type.toUpperCase(),
        deposit,
        withdraw,
        withdrawFee: null,
        withdrawMin: null,
      }
    })
  },
  balance: (data: IUpbitBalance[]): IBalance[] => {
    return data.map(({ currency, balance, locked, avg_buy_price }) => {
      return {
        currency,
        balance: toBigNumberString(balance),
        lockedBalance: toBigNumberString(locked),
        avgBuyPrice: toBigNumberString(avg_buy_price),
      }
    })
  },
  depositAddress: (data: IUpbitDepositAddress): IDepositAddress => {
    return {
      currency: data.currency.toUpperCase(),
      network: data.net_type.toUpperCase(),
      address: data.deposit_address,
      memo: data.secondary_address ?? null,
    }
  },
  depositHistory: (data: IUpbitDepositHistory[]): IDepositWithdrawHistory[] => {
    const convertState = (state: string): DepsoitWithdrawState => {
      switch (state) {
        case 'PROCESSING':
          return DepsoitWithdrawState.processing
        case 'ACCEPTED':
          return DepsoitWithdrawState.accepted
        case 'CANCELLED':
          return DepsoitWithdrawState.canceled
        case 'REJECTED':
          return DepsoitWithdrawState.rejected
        case 'TRAVEL_RULE_SUSPECTED':
          return DepsoitWithdrawState.travelRuleSuspected
        case 'REFUNDING':
          return DepsoitWithdrawState.refunded
        case 'REFUNDED':
          return DepsoitWithdrawState.refunded
        default:
          return DepsoitWithdrawState.unknown
      }
    }
    return data.map(
      ({
        currency,
        net_type,
        txid,
        state,
        created_at,
        done_at,
        amount,
        fee,
      }) => {
        return {
          type: DepositWithdrawType.deposit,
          txId: txid,
          currency: currency.toUpperCase(),
          network: net_type.toUpperCase() ?? null,
          amount: toBigNumberString(amount),
          fee: toBigNumberString(fee),
          state: convertState(state),
          fromAddress: null,
          fromAddressTag: null,
          toAddress: null,
          toAddressTag: null,
          createdAt: toTimestamp(created_at),
          confirmedAt: toTimestamp(done_at),
        }
      }
    )
  },
  withdrawHistory: (
    data: IUpbitWithdrawHistory[]
  ): IDepositWithdrawHistory[] => {
    const convertState = (state: string): DepsoitWithdrawState => {
      switch (state) {
        case 'WAITING': // 입금진행
          return DepsoitWithdrawState.waiting
        case 'PROCESSING':
          return DepsoitWithdrawState.processing
        case 'DONE':
          return DepsoitWithdrawState.accepted
        case 'FAILED':
          return DepsoitWithdrawState.failed
        case 'CANCELLED':
          return DepsoitWithdrawState.canceled
        case 'REJECTED':
          return DepsoitWithdrawState.rejected
        default:
          return DepsoitWithdrawState.unknown
      }
    }
    return data.map(
      ({ currency, txid, state, created_at, done_at, amount, fee }) => {
        return {
          type: DepositWithdrawType.withdraw,
          txId: txid,
          currency: currency.toUpperCase(),
          network: null,
          amount: toBigNumberString(amount),
          fee: toBigNumberString(fee),
          state: convertState(state),
          fromAddress: null,
          fromAddressTag: null,
          toAddress: null,
          toAddressTag: null,
          createdAt: toTimestamp(created_at),
          confirmedAt: toTimestamp(done_at),
        }
      }
    )
  },
  completedOrderHistory: (
    data: IUpbitCompletedOrderHistory[]
  ): IOrderHistory[] => {
    const convertorderType = (type: string): OrderType => {
      switch (type) {
        case 'limit':
          return OrderType.limit
        case 'price':
        case 'market':
          return OrderType.market
        case 'best':
          return OrderType.best
        case 'stop_limit':
          return OrderType.stop_limit
        default:
          return OrderType.unknown
      }
    }
    const convertState = (state: string): OrderState => {
      switch (state) {
        case 'wait':
          return OrderState.undone
        case 'watch':
          return OrderState.undone
        case 'done':
          return OrderState.done
        case 'cancel':
          return OrderState.done
        default:
          return OrderState.unknown
      }
    }
    return data.map(
      ({
        uuid,
        market,
        ord_type,
        price,
        side,
        volume,
        executed_volume,
        state,
        created_at,
        paid_fee,
      }) => {
        const [unit, currency] = market.split('-')
        return {
          id: uuid,
          type: convertorderType(ord_type),
          side: side == 'ask' ? OrderSide.ask : OrderSide.bid,
          state: convertState(state),
          currency: currency.toUpperCase(),
          unit,
          price: toBigNumberString(price),
          orderAmount: toBigNumberString(volume),
          excutedAmount: toBigNumberString(executed_volume),
          fee: toBigNumberString(paid_fee),
          createdAt: toTimestamp(created_at),
        }
      }
    )
  },
  unCompletedOrderHistory: (
    data: IUpbitUnCompletedOrderHistory[]
  ): IOrderHistory[] => {
    const convertorderType = (type: string): OrderType => {
      switch (type) {
        case 'limit':
          return OrderType.limit
        case 'price':
        case 'market':
          return OrderType.market
        case 'best':
          return OrderType.best
        case 'stop_limit':
          return OrderType.stop_limit
        default:
          return OrderType.unknown
      }
    }
    const convertState = (state: string): OrderState => {
      switch (state) {
        case 'wait':
          return OrderState.undone
        case 'watch':
          return OrderState.undone
        case 'done':
          return OrderState.done
        case 'cancel':
          return OrderState.done
        default:
          return OrderState.unknown
      }
    }
    return data.map(
      ({
        uuid,
        market,
        ord_type,
        price,
        side,
        volume,
        executed_volume,
        state,
        created_at,
        paid_fee,
      }) => {
        const [unit, currency] = market.split('-')
        return {
          id: uuid,
          type: convertorderType(ord_type),
          side: side == 'ask' ? OrderSide.ask : OrderSide.bid,
          state: convertState(state),
          currency: currency.toUpperCase(),
          unit,
          price: toBigNumberString(price),
          orderAmount: toBigNumberString(volume),
          excutedAmount: toBigNumberString(executed_volume),
          fee: toBigNumberString(paid_fee),
          createdAt: toTimestamp(created_at),
        }
      }
    )
  },
}
