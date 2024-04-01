import { WebSocketClient } from "../common/websocket";
import { subscribeType } from "../common/enum";
import { IMarket, ITicker } from "@common/interfaces/exchange.public.interface";
import { IBalance, IDepositAddress, IDepositWithdrawHistory, IOrderHistory, IWalletStatus } from "@common/interfaces/exchange.private.interface";

export abstract class Exchange {
  public abstract fetchMarkets(): Promise<IMarket[]>;
  public abstract fetchTickers(): Promise<ITicker[]>;
  public abstract fetchWalletStatus(): Promise<IWalletStatus[]>;
  public abstract fetchBalances(): Promise<IBalance[]>;
  public abstract fetchDepositAddresses(): Promise<IDepositAddress[]>;
  public abstract fetchCompletedOrderHistory(page: number, limit: number): Promise<IOrderHistory[]>;
  public abstract fetchUnCompletedOrderHistory(page: number, limit: number): Promise<IOrderHistory[]>;
  public abstract fetchDepositHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  public abstract fetchWithdrawHistory(currency: string, page: number, limit: number): Promise<IDepositWithdrawHistory[]>;
  public abstract subscribeData(type: subscribeType): Promise<WebSocketClient>;
}
