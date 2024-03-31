import { IBalance, IDepositAddress, IDepositWithdrawHistory, IMarket, IMarketPrice, IOrderHistory } from "@exchange/exchange.interface";

export abstract class Exchange {
  public abstract fetchTickers(): Promise<any>;
  public abstract fetchWalletStatus(): Promise<any>;
  public abstract fetchBalances(): Promise<IBalance[]>;
  public abstract fetchDepositAddresses(): Promise<IDepositAddress[]>;
  public abstract fetchOrderHistory(currency: string, unit: string, page: number, limit: number): Promise<IOrderHistory[]>;
  public abstract fetchDepositHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  public abstract fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
}
