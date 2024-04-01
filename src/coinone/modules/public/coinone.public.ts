import { method, request } from "@common/requests";
import { IExchangePublic, IMarket, ITicker } from "@common/interfaces/exchange.public.interface";
import { CoinoneShared } from "../shared/coinone.shared";
import { converter } from "./coinone.public.converter";

export class CoinonePublic extends CoinoneShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public fetchMarkets(): Promise<IMarket[]> {
    return request(method.get, this.apiUrl, this.endpoints.market, {
      converter: converter.markets,
    });
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    return request(method.get, this.apiUrl, this.endpoints.ticker, {
      converter: converter.tickers,
    });
  }
}
