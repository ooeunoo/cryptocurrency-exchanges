// Upbit.ts

import { UpbitPrivate } from "./modules/private/upbit.private";
import { UpbitPublic } from "./modules/public/upbit.public";
import { UpbitShared } from "./modules/shared/upbit.shared";
import { UpbitSubscribe } from "./modules/subscribe/upbit.subscribe";

export class Upbit {
  public: UpbitPublic;
  private: UpbitPrivate;
  subscribe: UpbitSubscribe;

  constructor(accessKey: string, secretKey: string) {
    this.public = new UpbitPublic();
    this.private = new UpbitPrivate(accessKey, secretKey);
    this.subscribe = new UpbitSubscribe(accessKey, secretKey);
  }
}
