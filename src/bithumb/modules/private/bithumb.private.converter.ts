import {
  depositWithdrawType,
  depsoitWithdrawState,
  orderSide,
} from '../../../common/enum'
import {
  IBalance,
  IDepositAddress,
  IDepositWithdrawHistory,
  IExchangePrivateConverter,
  IOrderHistory,
  IWalletStatus,
} from '../../../common/interfaces/exchange.private.interface'
import { sub, toBigNumberString } from '../../../utils/number'
import {
  IBithumbBalance,
  IBithumbDepositAddress,
  IBithumbDepositHistory,
  IBithumbOrderHistory,
  IBithumbWalletStatus,
  IBithumbWithdrawHistory,
} from './bithumb.private.interface'
import { IBithumbResponse } from '../shared/bithumb.shared.interface'

export const converter: IExchangePrivateConverter = {
  walletStatus: function (
    data: IBithumbResponse<IBithumbWalletStatus[]>
  ): IWalletStatus[] {
    const pdata = data.data
    return pdata.map(
      ({ currency, net_type, deposit_status, withdrawal_status }) => {
        return {
          currency: currency.toUpperCase(),
          network: net_type.toUpperCase(),
          deposit: deposit_status == 1,
          withdraw: withdrawal_status == 1,
          withdrawMin: null,
          withdrawFee: null,
        }
      }
    )
  },
  balance: function (data: IBithumbResponse<IBithumbBalance>): IBalance[] {
    const pdata: IBithumbBalance = data.data
    const result: IBalance[] = []
    Object.keys(pdata).forEach((key) => {
      if (key.startsWith('total_')) {
        const balance = pdata[key]
        if (parseFloat(balance) > 0) {
          const [, currency] = key.split('_')
          const lockedBalance = pdata[`in_use_${currency}`]
          result.push({
            currency: currency.toUpperCase(),
            balance: toBigNumberString(balance),
            lockedBalance: toBigNumberString(lockedBalance),
            avgBuyPrice: null,
          })
        }
      }
    })
    return result
  },
  depositAddress: function (
    data: IBithumbResponse<IBithumbDepositAddress>
  ): IDepositAddress | null {
    const pdata = data.data
    if (pdata == undefined) return null

    let address = pdata.wallet_address
    let memo = null

    const [wallet_address, destination_tag] = pdata.wallet_address.split('&')
    if (destination_tag != undefined) {
      address = wallet_address
      memo = destination_tag.split('=')[1]
    }

    return {
      currency: pdata.currency,
      network: pdata.net_type,
      address,
      memo: memo,
    }
  },
  depositHistory: function (
    data: IBithumbResponse<IBithumbDepositHistory[]>
  ): IDepositWithdrawHistory[] {
    const pdata = data.data
    return pdata.map(({ order_currency, fee, amount, transfer_date }) => {
      return {
        type: depositWithdrawType.deposit,
        txId: null,
        currency: order_currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: depsoitWithdrawState.accepted,
        fromAddress: null,
        fromAddressTag: null,
        toAddress: null,
        toAddressTag: null,
        createdAt: transfer_date,
        confirmedAt: null,
      }
    })
  },
  withdrawHistory: function (
    data: IBithumbResponse<IBithumbWithdrawHistory[]>
  ): IDepositWithdrawHistory[] {
    const pdata = data.data

    return pdata.map(({ order_currency, fee, amount, transfer_date }) => {
      return {
        type: depositWithdrawType.withdraw,
        txId: null,
        currency: order_currency.toUpperCase(),
        network: null,
        amount: toBigNumberString(amount),
        fee: toBigNumberString(fee),
        state: depsoitWithdrawState.accepted,
        fromAddress: null,
        fromAddressTag: null,
        toAddress: null,
        toAddressTag: null,
        createdAt: transfer_date,
        confirmedAt: null,
      }
    })
  },
  completedOrderHistory: function (
    data: IBithumbResponse<IBithumbOrderHistory[]>
  ): IOrderHistory[] {
    const pdata = data.data

    return pdata.map(
      ({
        order_id,
        order_currency,
        payment_currency,
        order_date,
        type,
        price,
        units,
        units_remaining,
      }) => {
        return {
          id: order_id,
          type: null,
          side: type == 'bid' ? orderSide.bid : orderSide.ask,
          state: null,
          currency: order_currency.toUpperCase(),
          unit: payment_currency.toUpperCase(),
          price: toBigNumberString(price),
          orderAmount: toBigNumberString(units),
          excutedAmount: sub(units, units_remaining).toString(),
          fee: null,
          createdAt: parseInt(order_date),
        }
      }
    )
  },
  unCompletedOrderHistory: function (
    data: IBithumbResponse<IBithumbOrderHistory[]>
  ): IOrderHistory[] {
    const pdata = data.data

    return pdata.map(
      ({
        order_id,
        order_currency,
        payment_currency,
        order_date,
        type,
        price,
        units,
        units_remaining,
      }) => {
        return {
          id: order_id,
          type: null,
          side: type == 'bid' ? orderSide.bid : orderSide.ask,
          state: null,
          currency: order_currency.toUpperCase(),
          unit: payment_currency.toUpperCase(),
          price: toBigNumberString(price),
          orderAmount: toBigNumberString(units),
          excutedAmount: sub(units, units_remaining).toString(),
          fee: null,
          createdAt: parseInt(order_date),
        }
      }
    )
  },
}
