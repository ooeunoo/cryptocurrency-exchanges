import { method, request } from "../../../common/request/request";
import { IExchangePublic, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { KorbitShared } from "../shared/korbit.shared";
import { converter } from "./korbit.public.converter";
import { constants } from "../../korbit.constants";
import { IKorbitMarket, IKorbitTicker } from "./korbit.public.interface";

export class KorbitPublic extends KorbitShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IMarket[]> {
    const result = await request<IKorbitMarket[]>(method.get, constants.apiUrl, constants.endpoints.market);
    return converter.markets(result);
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const result = await request<IKorbitTicker[]>(method.get, constants.apiUrl, constants.endpoints.ticker);
    return converter.tickers(result);
  }
}
