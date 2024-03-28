export interface WithdrawHistory {
  type: "withdraw";
  currency: string;
  txId: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: string;
  confirmedAt: string;
}

export enum WithdrawState {
  WAITING,
  PROCESSING,
  DONE,
  FAILED,
  CANCELLED,
  REJECTED,
}
