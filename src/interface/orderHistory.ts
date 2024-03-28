export interface OrderHistory {
  currency: string; // 통화
  unit: string; // 단위
  price: string; // 구매가
  amount: string; // 개수
  fee: string; // 수수료
  createdAt: string;
}

export enum OrderState {
  wait,
  watch,
  done,
  cancel,
}

// "uuid": "9ca023a5-851b-4fec-9f0a-48cd83c2eaae",
// "side": "ask",
// "ord_type": "limit",
// "price": "4280000.0",
// "state": "done",
// "market": "KRW-BTC",
// "created_at": "2019-01-04T13:48:09+09:00",
// "volume": "1.0",
// "remaining_volume": "0.0",
// "reserved_fee": "0.0",
// "remaining_fee": "0.0",
// "paid_fee": "2140.0",
// "locked": "0.0",
// "executed_volume": "1.0",
// "trades_count": 1,
