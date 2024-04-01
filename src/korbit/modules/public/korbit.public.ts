import { method, request } from "../../../common/requests";
import { IExchangePublic, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { KorbitShared } from "../shared/korbit.shared";
import { converter } from "./korbit.public.converter";

export class KorbitPublic extends KorbitShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public fetchMarkets(): Promise<IMarket[]> {
    return request(method.get, this.apiUrl, this.endpoints.market, {
      converter: converter.markets,
    });
  }

  /* ------------------티커 조회-------------------- */
  public fetchTickers(): Promise<ITicker[]> {
    return request(method.get, this.apiUrl, this.endpoints.ticker, {
      converter: converter.tickers,
    });
  }
}
