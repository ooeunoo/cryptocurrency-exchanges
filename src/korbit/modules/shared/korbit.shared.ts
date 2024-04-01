import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";
import * as querystring from "querystring";
import * as crypto from "crypto";
import { IExchangeShared, ISharedEndpoint } from "../../../common/interfaces/exchange.shared.interface";
import { IKorbitOAuth, IKorbitOAuthData } from "./korbit.shared.interface";
import { method, request } from "../../../common/requests";
import { constants } from "../../korbit.constants";

export class KorbitShared implements IExchangeShared {
  private apiKey?: string;
  private secretKey?: string;
  protected accessToken?: string;
  private refresehToken?: string;
  private expiresIn?: number;

  constructor(apiKey?: string, secretKey?: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  protected async header(options?: any) {
    if (this.accessToken == null || this.expiresIn == null || this.expiresIn < new Date().getTime()) {
      await this._refreshAccessToken();
    }

    return { Authorization: `Bearer ${this.accessToken}` };
  }

  private async _refreshAccessToken() {
    const data: IKorbitOAuthData = {
      client_id: this.apiKey!,
      client_secret: this.secretKey!,
      grant_type: "client_credentials",
    };

    if (this.refresehToken != null) {
      data.grant_type = "refresh_token";
      data.refresh_token = this.refresehToken;
    }
    const { access_token, expires_in, refresh_token } = await request<IKorbitOAuth>(method.post, constants.apiUrl, constants.endpoints.oauth2!, {
      data: querystring.stringify(data as any),
    });

    this.accessToken = access_token;
    this.refresehToken = refresh_token;
    this.expiresIn = new Date().getTime() + expires_in;
  }
}
