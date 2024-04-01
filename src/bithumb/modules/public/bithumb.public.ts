import { method, request } from "../../../common/requests";
import { IExchangePublic, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { BithumbShared } from "../shared/bithumb.shared";
import { converter } from "./bithumb.public.converter";

export class BithumbPublic extends BithumbShared implements IExchangePublic {
  /* ------------------마켓 조회-------------------- */
  public async fetchMarkets(): Promise<IMarket[]> {
    const resultkrw = await request(method.get, this.apiUrl, this.endpoints.market + "/ALL_KRW", { converter: converter.marketskrw });
    const resultbtc = await request(method.get, this.apiUrl, this.endpoints.market + "/ALL_BTC", { converter: converter.marketsbtc });
    return resultkrw.concat(resultbtc);
  }

  /* ------------------티커 조회-------------------- */
  public async fetchTickers(): Promise<ITicker[]> {
    const resultkrw = await request(method.get, this.apiUrl, this.endpoints.ticker + "/ALL_KRW", { converter: converter.tickerskrw });
    const resultbtc = await request(method.get, this.apiUrl, this.endpoints.ticker + "/ALL_BTC", { converter: converter.tickersbtc });
    return resultkrw.concat(resultbtc);
  }
}
