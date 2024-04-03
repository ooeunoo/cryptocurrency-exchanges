import * as crypto from 'crypto'
import { IExchangeShared } from '../../../exchange/interfaces/exchange.shared.interface'
import { RawAxiosRequestHeaders } from 'axios'

export class CoinoneShared implements IExchangeShared {
  protected accessKey?: string
  private secretKey?: string

  constructor(accessKey?: string, secretKey?: string) {
    this.accessKey = accessKey
    this.secretKey = secretKey
  }

  protected header(options?: Record<string, unknown>): RawAxiosRequestHeaders {
    const payload = options.payload
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      'base64'
    )
    const signature = crypto
      .createHmac('sha512', this.secretKey!)
      .update(encodedPayload)
      .digest('hex')
    return {
      'Content-type': 'application/json',
      'X-COINONE-PAYLOAD': encodedPayload,
      'X-COINONE-SIGNATURE': signature,
    }
  }
}
