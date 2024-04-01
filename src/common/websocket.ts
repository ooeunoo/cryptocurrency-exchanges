import { DataConverter } from "@utils/type";
import * as WebSocket from "ws";

export interface WebSocketSubscription {
  onData: (data: any) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export class WebSocketClient {
  public ws;

  private data: Record<string, any>;
  private alive: boolean;
  private converter?: DataConverter;
  private subscription: WebSocketSubscription | null = null;

  constructor(baseUrl: string, headers: any, data: Record<string, any>, converter?: DataConverter) {
    this.ws = new WebSocket(baseUrl, { headers });

    this.data = data;
    this.alive = false;
    this.converter = converter;

    this.ws.on("message", this.handleMessage.bind(this));
    this.ws.on("error", this.handleError.bind(this));
    this.ws.on("close", this.handleClose.bind(this));
  }

  run() {
    this.ws.on("open", () => {
      this.ws.send(JSON.stringify(this.data));
    });
  }

  terminate() {
    this.alive = false;
    if (this.ws) {
      this.ws.terminate();
    }
  }

  subscribe(subscription: WebSocketSubscription) {
    this.subscription = subscription;

    if (!this.alive) {
      this.run();
      this.alive = true;
    }
  }

  unsubscribe(subscription: WebSocketSubscription) {
    this.terminate();
    this.subscription = null;
  }

  private handleMessage(data: WebSocket.Data) {
    const receiveData = JSON.parse(data.toString("utf-8"));
    const convertedData = this.converter ? this.converter(receiveData) : receiveData;
    if (this.subscription) {
      this.subscription.onData(convertedData);
    }
  }

  private handleError(error: Error) {
    if (this.subscription && this.subscription.onError) {
      this.subscription.onError(error);
    }
  }

  private handleClose() {
    if (this.subscription && this.subscription.onClose) {
      this.subscription.onClose();
    }
  }
}
