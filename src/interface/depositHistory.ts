export interface DepositHistory {
  type: "deposit";
  txId: string;
  currency: string;
  amount: string;
  fee: string;
  state: string;
  createdAt: string;
  confirmedAt: string;
}

export enum DepsoitState {
  PROCESSING,
  ACCEPTED,
  CANCELLED,
  REJECTED,
  TRAVEL_RULE_SUSPECTED,
  REFUNDING,
  REFUNDED,
}
