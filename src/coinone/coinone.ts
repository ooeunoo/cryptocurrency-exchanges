import { CoinonePrivate } from "./modules/private/coinone.private";
import { CoinonePublic } from "./modules/public/coinone.public";
import { CoinoneSubscribe } from "./modules/subscribe/coinone.subscribe";

export class Coinone {
  public: CoinonePublic;
  private: CoinonePrivate;
  subscribe: CoinoneSubscribe;

  constructor(accessKey: string, secretKey: string) {
    this.public = new CoinonePublic();
    this.private = new CoinonePrivate(accessKey, secretKey);
    this.subscribe = new CoinoneSubscribe(accessKey, secretKey);
  }
}
