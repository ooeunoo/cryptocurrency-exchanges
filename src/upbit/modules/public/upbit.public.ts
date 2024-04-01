import { method, request } from "../../../common/requests";
import { UpbitShared } from "../shared/upbit.shared";
import { IExchangePublic, IMarket, ITicker } from "../../../common/interfaces/exchange.public.interface";
import { converter } from "./upbit.public.converter";

export class UpbitPublic extends UpbitShared implements IExchangePublic {
  public async fetchMarkets(): Promise<IMarket[]> {
    return request(method.get, this.apiUrl, this.endpoints.market, { converter: converter.markets });
  }

  public async fetchTickers(): Promise<ITicker[]> {
    const markets = await this.fetchMarkets();
    const marketString = markets.map(({ currency, unit }) => `${unit}-${currency}`).join(",");

    return request(method.get, this.apiUrl, this.endpoints.ticker, {
      params: { markets: marketString },
      converter: converter.tickers,
    });
  }
}
