import { Balance } from "./interface/balance";
import { DepositAddress } from "./interface/depositAddress";
import { DepositHistory } from "./interface/depositHistory";
import { Market } from "./interface/market";
import { OrderHistory } from "./interface/orderHistory";
import { WithdrawHistory } from "./interface/withdrawHistory";

export abstract class Exchange {
  public abstract fetchMarkets(): Promise<Market[]>;
  public abstract fetchBalance(params?: {
    currency?: string;
  }): Promise<Balance[]>;
  public abstract fetchOrderHistory(params: {
    page?: number;
    limit?: number;
    currency?: string;
  }): Promise<OrderHistory[]>;
  public abstract fetchDepositHistory(params: {
    currency: string;
    page?: number;
    limit?: number;
  }): Promise<DepositHistory[]>;
  public abstract fetchWithdrawHistory(params?: {
    page?: number;
    limit?: number;
    currency?: string;
  }): Promise<WithdrawHistory[]>;
  public abstract fetchDepositAddress(params: {
    currency: string;
    network: string;
  }): Promise<DepositAddress>;

  //   public abstract fetchSupportCurrencyNetwork(currency: string):
  //   public abstract fetchOrderBooks(): any;
  //   public abstract fetchOrderBook(): any;
  //   public abstract fetchTickers(): any;
  //   public abstract fetchTicker(): any;
  //   public abstract fetchTrades(): any;
  //   public abstract fetchTradingFee(): any;
  //   public abstract fetchOHLCV(): any;
  //   public abstract createOrder(): any;
  //   public abstract cancelOrder(): any;
  //   public abstract fetchDeposits(): any;
  //   public abstract fetchDeposit(): any;
  //   public abstract fetchWithdrawals(): any;
  //   public abstract fetchWithdrawal(): any;
  //   public abstract fetchOpenOrders(): any;
  //   public abstract fetchClosedOrders(): any;
  //   public abstract fetchCanceledOrders(): any;
  //   public abstract fetchOrder(): any;
  //   public abstract fetchDepositAddresses(): any;
  //   public abstract fetchDepositAddress(): any;
  //   public abstract createDepositAddress(): any;
  //   public abstract withdraw(): any;
  //   public abstract watchTicker(): any;
  //   public abstract watchTrades(): any;
  //   public abstract watchOrderBook(): any;
}
