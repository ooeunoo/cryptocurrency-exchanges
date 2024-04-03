export enum DepositWithdrawType {
  deposit = 'deposit',
  withdraw = 'withdraw',
}

export enum DepsoitWithdrawState {
  canceled = 'canceled', // 취소
  waiting = 'waiting', // 대기
  processing = 'processing', // 진행
  accepted = 'accepted', // 확정
  rejected = 'rejected', // 거절
  failed = 'failed', // 실패
  travelRuleSuspected = 'travelRuleSuspected', // 트래블룰 의심
  refunded = 'refunded', // 환불
  refundFailed = 'refundFailed', // 환불 실패
  unknown = 'unknown',
}

export enum OrderState {
  undone = 'undone',
  done = 'done',
  cancel = 'cancel',
  unknown = 'unknown',
}

export enum OrderType {
  limit = 'limit',
  market = 'market',
  stop_limit = 'stop_limit',
  best = 'best',
  unknown = 'unknown',
}

export enum OrderSide {
  ask = 'ask',
  bid = 'bid',
  unknown = 'unknown',
}
