import * as crypto from "crypto";
import * as queystring from "querystring";
import { IExchangeShared, ISharedEndpoint } from "../../../common/interfaces/exchange.shared.interface";

export class BithumbShared implements IExchangeShared {
  private connectKey?: string;
  private secretKey?: string;

  constructor(connectKey?: string, secretKey?: string) {
    this.connectKey = connectKey;
    this.secretKey = secretKey;
  }

  header(options: { endpoint: string; parameters?: any }) {
    const { endpoint, parameters } = options;
    const nonce = new Date().getTime();
    const requestSignature = `${endpoint}${String.fromCharCode(0)}${queystring.stringify(parameters)}${String.fromCharCode(0)}${nonce}`;
    const hmacSignature = Buffer.from(crypto.createHmac("sha512", this.secretKey!).update(requestSignature).digest("hex")).toString("base64");

    return {
      "Api-Key": this.connectKey,
      "Api-Sign": hmacSignature,
      "Api-Nonce": nonce,
    };
  }
}
