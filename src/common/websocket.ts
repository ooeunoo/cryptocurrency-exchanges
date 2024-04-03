import { DataConverter } from '../utils/type'
import WebSocket from 'ws'

export interface WebSocketSubscription {
  onData: (data: unknown) => void
  onError?: (error: Error) => void
  onClose?: () => void
}

export class WebSocketClient {
  public ws

  private data: Record<string, unknown> | Record<string, unknown>[]
  private alive: boolean
  private converter?: DataConverter
  private subscription: WebSocketSubscription | null = null

  constructor(
    baseUrl: string,
    headers: { [key: string]: string } | undefined,
    data: Record<string, unknown> | Record<string, unknown>[],
    converter: DataConverter | undefined
  ) {
    this.ws = new WebSocket(baseUrl, { headers })

    this.data = data
    this.alive = false
    this.converter = converter

    this.ws.on('message', this.handleMessage.bind(this))
    this.ws.on('error', this.handleError.bind(this))
    this.ws.on('close', this.handleClose.bind(this))
  }

  run(): void {
    this.ws.on('open', () => {
      this.ws.send(JSON.stringify(this.data))
    })
  }

  terminate(): void {
    this.alive = false
    if (this.ws) {
      this.ws.terminate()
    }
  }

  subscribe(subscription: WebSocketSubscription): void {
    this.subscription = subscription

    if (!this.alive) {
      this.run()
      this.alive = true
    }
  }

  unsubscribe(): void {
    this.terminate()
    this.subscription = null
  }

  private handleMessage(data: WebSocket.Data): void {
    const receiveData = JSON.parse(data.toString('utf-8'))

    const convertedData = this.converter
      ? this.converter(receiveData)
      : receiveData
    if (this.subscription) {
      this.subscription.onData(convertedData)
    }
  }

  private handleError(error: Error): void {
    if (this.subscription && this.subscription.onError) {
      this.subscription.onError(error)
    }
  }

  private handleClose(): void {
    if (this.subscription && this.subscription.onClose) {
      this.subscription.onClose()
    }
  }
}
