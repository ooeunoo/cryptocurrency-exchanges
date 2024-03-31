export enum depositWithdrawType {
  deposit = "deposit",
  withdraw = "withdraw",
}

export enum depsoitWithdrawState {
  canceled = "canceled", // 취소
  waiting = "waiting", // 대기
  processing = "processing", // 진행
  accepted = "accepted", // 확정
  rejected = "rejected", // 거절
  failed = "failed", // 실패
  travel_rule_suspected = "travel_rule_suspected", // 트래블룰 의심
  refunded = "refunded", // 환불
}

export enum orderState {
  wait = "wait",
  watch = "watch",
  done = "done",
  cancel = "cancel",
  unknown = "unknown",
}

export enum orderType {
  limit = "limit",
  market = "market",
  stop_limit = "stop_limit",
  best = "best",
}

export enum orderSide {
  ask = "ask",
  bid = "bid",
}

export enum TickerChange {
  rise = "rise", // 상승
  even = "even", // 보합
  fall = "fall", // 하락
}
