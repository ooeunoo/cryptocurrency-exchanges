import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as querystring from "querystring";
import * as crypto from "crypto";
import { IExchangeShared } from "../../../common/interfaces/exchange.shared.interface";
import { RawAxiosRequestHeaders } from "axios";

export class UpbitShared implements IExchangeShared {
  private accessKey?: string;
  private secretKey?: string;

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  protected header(options?: { params?: Record<string, unknown> }): RawAxiosRequestHeaders {
    const payload: Record<string, unknown> = {
      access_key: this.accessKey,
      nonce: uuidv4(),
    };

    let query: string = "";

    if (options?.params && Object.keys(options?.params).length != 0) {
      const { params } = options;
      let nonArrayQuery = null;
      let arrayQuery = null;

      const arrayParams: Record<string, string[]> = {};
      const nonArrayParams: Record<string, unknown> = {};

      // Array 값을 가진 파라미터와 아닌 파라미터 분리
      for (const key in params) {
        if (Array.isArray(params[key])) {
          arrayParams[key] = params[key] as string[];
        } else {
          nonArrayParams[key] = params[key];
        }
      }

      // 각각 다르게 인코딩
      if (Object.keys(nonArrayParams).length != 0) {
        nonArrayQuery = querystring.encode(nonArrayParams as querystring.ParsedUrlQueryInput);
      }

      if (Object.keys(arrayParams).length != 0) {
        arrayQuery = Object.keys(arrayParams)
          .map((key) => {
            const values: string[] = arrayParams[key];
            return values.map((value: string) => `${key}[]=${value}`).join("&");
          })
          .join("&");
      }

      // 쿼리 생성
      if (nonArrayQuery != null && arrayQuery != null) {
        query += nonArrayQuery + "&" + arrayQuery;
      } else if (nonArrayQuery != null) {
        query += nonArrayQuery;
      } else if (arrayQuery != null) {
        query += arrayQuery;
      }

      const hash = crypto.createHash("sha512");
      const queryHash = hash.update(query, "utf-8").digest("hex");
      payload.query_hash = queryHash;
      payload.query_hash_alg = "SHA512";
    }

    const token = sign(payload, this.secretKey!);
    return { Authorization: `Bearer ${token}` };
  }
}
