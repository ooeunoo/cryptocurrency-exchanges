import { depsoitWithdrawState, orderSide, orderState, orderType } from "../../common/enum";

export interface IExchangePrivate {
  fetchWalletStatus(): Promise<IWalletStatus[]>;
  fetchBalance(): Promise<IBalance[]>;
  fetchDepositAddress(): Promise<IDepositAddress[]>;
  fetchDepositHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  fetchCompletedOrderHistory(): Promise<IOrderHistory[]>;
  fetchUnCompletedOrderHistory(): Promise<IOrderHistory[]>;
}

export interface IExchangePrivateConverter {
  walletStatus: (data: any) => IWalletStatus[];
  balance: (data: any) => IBalance[];
  depositAddress: (data: any) => IDepositAddress | IDepositAddress[];
  depositHistory: (data: any) => IDepositWithdrawHistory[];
  withdrawHistory: (data: any) => IDepositWithdrawHistory[];
  completedOrderHistory: (data: any) => IOrderHistory[];
  unCompletedOrderHistory: (data: any) => IOrderHistory[];
}

export interface IWalletStatus {
  currency: string; // 통화
  network: string | null; // 네트워크
  deposit: boolean; // 입금 가능 여부
  withdraw: boolean; // 출금 가능 여부
  withdrawMin: string | null; // 최소 출금 금액
  withdrawFee: string | null; // 출금 수수료
}

export interface IBalance {
  currency: string; // 통화
  balance: string; // 유동 수량
  lockedBalance: string; // 잠긴 수량
  avgBuyPrice: string | null; // 평단가
}

export interface IDepositAddress {
  currency: string; // 통화 화폐
  network: string | null; // 네트워크
  address: string; // 주소
  memo?: string | null; // 메모 (태그) ex) 리플
}

export interface IDepositWithdrawHistory {
  type: string; // 타입 - 입금 / 출금
  txId: string | null; // 트랜잭션 아이디
  currency: string; // 통화 화폐
  network: string | null; // 네트워크
  amount: string; // 수량
  fee: string | null; // 수수료
  state: depsoitWithdrawState; //  상태
  fromAddress: string | null; // From 주소
  fromAddressTag: string | null; // To 주소의 태그
  toAddress: string | null; // To 주소
  toAddressTag: string | null; // To 주소의 태그
  createdAt: number | null; // 생성 일시
  confirmedAt: number | null; // 확정 일시
}

export interface IOrderHistory {
  id: string; // 주문 id
  type: orderType | null; // 타입 - 리밋 / 마켓/ 스탑 리밋
  side: orderSide; // 사이드 - 매수 / 매도
  state: orderState | null; // 주문 상태
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  orderAmount: string; // 주문 수량
  excutedAmount: string; // 체결 수량
  fee: string | null; // 수수료
  createdAt: number | null;
}
