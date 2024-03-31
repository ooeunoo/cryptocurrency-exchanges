export interface IKorbitOAuthData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token?: string;
}

export interface IKorbitOAuth {
  token_type: string; // "Bearer";
  access_token: string; //"IuqEWTK09eCLThRCZZSALA0oXC8EI7s";
  expires_in: string; //3600;
  scope: string; //"VIEW,TRADE";
  refresh_token: string; //"vn5xoOf4Pzckgn4jQSL9Sb3KxWJvYtm";
}

export interface IKorbitTicker {
  [market: string]: {
    timestamp: number; //1559285555322;
    last: string; // "513000";
    open: string; //  "523900";
    bid: string; // "512100";
    ask: string; // "513350";
    low: string; // "476200";
    high: string; // "540900";
    volume: string; // "4477.20611753";
    change: string; // "-10900";
    changePercent: string; // "-2.08";
  };
}

export interface IKorbitBalance {
  [currency: string]: {
    available: string; //"0";
    trade_in_use: string; //"0";
    withdrawal_in_use: string; //"0";
    avg_price: string; // "0";
    avg_price_updated_at: number; // 1646184883782;
  };
}

export interface IKorbitMyAddresses {
  deposit: {
    [currency: string]: {
      bank_name: string; // krw
      account_name: string; // krw
      account_number: string; // krw
      address: string;
      destination_tag: string;
    };
  };
  withdrawal: {
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
