export interface IKorbitBalance {
  [currency: string]: {
    available: string; //"0";
    trade_in_use: string; //"0";
    withdrawal_in_use: string; //"0";
    avg_price: string; // "0";
    avg_price_updated_at: number; // 1646184883782;
  };
}

export interface IKorbitDepositAddress {
  deposit: {
    [currency: string]: {
      bank_name: string; // krw
      account_name: string; // krw
      account_number: string; // krw
      address: string;
      destination_tag: string;
    };
  };
}

export interface IKorbitHistory {
  id: string; // "270";
  type: string; // "deposit";
  currency: string; // "btc";
  amount: string; // "0.81140000";
  completed_at: number; // 11750020020;
  updated_at: number; // 11550050080
  created_at: number; // 11550020020
  status: string; // "filled";
  details: {
    transaction_id: string; // "2d84855aa9c...";
    address: string; // "1F1zAaz5x1HUXrCNLbtMDqcw6o5GNx4xqX";
    destination_tag?: string; // 123213
  };
}
