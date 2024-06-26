import { IResponse } from '../../common/response/response.interface'
import {
  DepsoitWithdrawState,
  OrderSide,
  OrderState,
  OrderType,
} from '../enums/exchange.private.enum'

export interface IExchangePrivate {
  fetchWalletStatus(): Promise<IResponse<IWalletStatus[]>>
  fetchBalance(): Promise<IResponse<IBalance[]>>
  fetchDepositAddress(
    currency: string,
    network?: string
  ): Promise<IResponse<IDepositAddress | null>>
  fetchDepositHistory(
    currency: string,
    page: number,
    limit: number
  ): Promise<IResponse<IDepositWithdrawHistory[]>>
  fetchWithdrawHistory(
    currency: string,
    page: number,
    limit: number
  ): Promise<IResponse<IDepositWithdrawHistory[]>>
  fetchCompletedOrderHistory(): Promise<IResponse<IOrderHistory[]>>
  fetchUnCompletedOrderHistory(): Promise<IResponse<IOrderHistory[]>>
}

export interface IExchangePrivateConverter {
  walletStatus: (data: unknown) => IWalletStatus[]
  balance: (data: unknown) => IBalance[]
  depositAddress: (
    data: unknown,
    args?: Record<string, unknown>
  ) => IDepositAddress
  depositHistory: (data: unknown) => IDepositWithdrawHistory[]
  withdrawHistory: (data: unknown) => IDepositWithdrawHistory[]
  completedOrderHistory: (data: unknown) => IOrderHistory[]
  unCompletedOrderHistory: (data: unknown) => IOrderHistory[]
}

export interface IWalletStatus {
  currency: string // 통화
  network: string | null // 네트워크
  deposit: boolean // 입금 가능 여부
  withdraw: boolean // 출금 가능 여부
  withdrawMin: string | null // 최소 출금 금액
  withdrawFee: string | null // 출금 수수료
}

export interface IBalance {
  currency: string // 통화
  balance: string // 유동 수량
  lockedBalance: string // 잠긴 수량
  avgBuyPrice: string | null // 평단가
}

export interface IDepositAddress {
  currency: string // 통화 화폐
  network: string | null // 네트워크
  address: string // 주소
  memo?: string | null // 메모 (태그) ex) 리플
}

export interface IDepositWithdrawHistory {
  type: string // 타입 - 입금 / 출금
  txId: string | null // 트랜잭션 아이디
  currency: string // 통화 화폐
  network: string | null // 네트워크
  amount: string // 수량
  fee: string | null // 수수료
  state: DepsoitWithdrawState //  상태
  fromAddress: string | null // From 주소
  fromAddressTag: string | null // To 주소의 태그
  toAddress: string | null // To 주소
  toAddressTag: string | null // To 주소의 태그
  createdAt: number | null // 생성 일시
  confirmedAt: number | null // 확정 일시
}

export interface IOrderHistory {
  id: string // 주문 id
  type: OrderType | null // 타입 - 리밋 / 마켓/ 스탑 리밋
  side: OrderSide // 사이드 - 매수 / 매도
  state: OrderState | null // 주문 상태
  currency: string // 통화
  unit: string // 단위
  price: string // 구매가
  orderAmount: string // 주문 수량
  excutedAmount: string // 체결 수량
  fee: string | null // 수수료
  createdAt: number | null
}
