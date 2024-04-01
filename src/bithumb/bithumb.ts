import { BithumbPrivate } from "./modules/private/bithumb.private";
import { BithumbPublic } from "./modules/public/bithumb.public";
import { BithumbSubscribe } from "./modules/subscribe/bithumb.subscribe";

export class Bithumb {
  public: BithumbPublic;
  private: BithumbPrivate;
  subscribe: BithumbSubscribe;

  constructor(connectKey: string, secretKey: string) {
    this.public = new BithumbPublic();
    this.private = new BithumbPrivate(connectKey, secretKey);
    this.subscribe = new BithumbSubscribe(connectKey, secretKey);
  }
}
