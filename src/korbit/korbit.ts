import { KorbitPrivate } from "./modules/private/korbit.private";
import { KorbitPublic } from "./modules/public/korbit.public";
import { KorbitSubscribe } from "./modules/subscribe/korbit.subscribe";

export class Korbit {
  public: KorbitPublic;
  private: KorbitPrivate;
  subscribe: KorbitSubscribe;

  constructor(accessKey: string, secretKey: string) {
    this.public = new KorbitPublic();
    this.private = new KorbitPrivate(accessKey, secretKey);
    this.subscribe = new KorbitSubscribe(accessKey, secretKey);
  }
}
