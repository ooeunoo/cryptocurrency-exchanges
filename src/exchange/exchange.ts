import {
  ExchangeBalance,
  ExchangeDepositAddress,
  ExchangeDepositWithdrawHistory,
  ExchangeMarket,
  ExchangeMarketPrice,
  ExchangeOrderHistory,
} from "@exchange/exchange.interface";

export abstract class Exchange {
  public abstract fetchTickers(): Promise<any>;
  public abstract fetchWalletStatus(): Promise<any>;
  public abstract fetchBalances(): Promise<ExchangeBalance[]>;
  public abstract fetchDepositAddresses(): Promise<ExchangeDepositAddress[]>;
  public abstract fetchOrderHistory(currency: string, unit: string, page: number, limit: number): Promise<ExchangeOrderHistory[]>;
  public abstract fetchDepositHistory(currency: string, page: number, limit: number): Promise<ExchangeDepositWithdrawHistory[]>;
  public abstract fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<ExchangeDepositWithdrawHistory[]>;
}
