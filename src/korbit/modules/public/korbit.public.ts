import { method, request } from "../../../common/requests";
import { IExchangePublic, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { KorbitShared } from "../shared/korbit.shared";
import { converter } from "./korbit.public.converter";
import { constants } from "../../korbit.constants";

export class KorbitPublic extends KorbitShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public fetchMarkets(): Promise<IMarket[]> {
    return request(method.get, constants.apiUrl, constants.endpoints.market, {
      converter: converter.markets,
    });
  }

  /* ------------------티커 조회-------------------- */
  public fetchTickers(): Promise<ITicker[]> {
    return request(method.get, constants.apiUrl, constants.endpoints.ticker, {
      converter: converter.tickers,
    });
  }
}
