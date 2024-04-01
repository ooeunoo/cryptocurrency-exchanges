import * as crypto from "crypto";
import { IExchangeShared, ISharedEndpoint } from "../../../common/interfaces/exchange.shared.interface";

export class CoinoneShared implements IExchangeShared {
  protected accessKey?: string;
  private secretKey?: string;

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  protected header(options?: any) {
    const payload = options.payload;
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature = crypto.createHmac("sha512", this.secretKey!).update(encodedPayload).digest("hex");
    return {
      "Content-type": "application/json",
      "X-COINONE-PAYLOAD": encodedPayload,
      "X-COINONE-SIGNATURE": signature,
    };
  }
}
