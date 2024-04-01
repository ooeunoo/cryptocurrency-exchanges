// Upbit.ts

import { IExchange } from "common/interfaces/exchange.interface";
import { UpbitPrivate } from "./modules/private/upbit.private";
import { UpbitPublic } from "./modules/public/upbit.public";
import { UpbitSubscribe } from "./modules/subscribe/upbit.subscribe";

export class Upbit implements IExchange {
  public: UpbitPublic;
  private: UpbitPrivate;
  subscribe: UpbitSubscribe;

  constructor(accessKey: string, secretKey: string) {
    this.public = new UpbitPublic();
    this.private = new UpbitPrivate(accessKey, secretKey);
    this.subscribe = new UpbitSubscribe(accessKey, secretKey);
  }
}
