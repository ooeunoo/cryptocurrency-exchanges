import { IBalance, IDepositAddress, IDepositWithdrawHistory, IOrderHistory, ITicker, IWalletStatus } from "@exchange/exchange.interface";

export abstract class Exchange {
  public abstract fetchTickers(): Promise<ITicker[]>;
  public abstract fetchWalletStatus(): Promise<IWalletStatus[]>;
  public abstract fetchBalances(): Promise<IBalance[]>;
  public abstract fetchDepositAddresses(): Promise<IDepositAddress[]>;
  public abstract fetchOrderHistory(currency: string, page: number, limit: number): Promise<IOrderHistory[]>;
  public abstract fetchDepositHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  public abstract fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  public abstract subscribePublicData(type: string);
}
