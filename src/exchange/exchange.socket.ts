import { DataConverter } from "@utils/type";
import * as WebSocket from "ws";

export interface WebSocketSubscription {
  onData: (data: any) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export class WebSocketClient<O, T> {
  public ws;

  private data: Record<string, any>;
  private alive: boolean;
  private converter?: DataConverter<O, T>;
  private subscriptions: WebSocketSubscription[] = [];

  constructor(baseUrl: string, headers: any, data: Record<string, any>, converter: DataConverter<O, T>) {
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
    this.subscriptions.push(subscription);

    if (!this.alive) {
      this.run();
      this.alive = true;
    }
  }

  unsubscribe(subscription: WebSocketSubscription) {
    this.terminate();
    const index = this.subscriptions.indexOf(subscription);
    if (index !== -1) {
      this.subscriptions.splice(index, 1);
    }
  }

  private handleMessage(data: WebSocket.Data) {
    const receiveData: O = JSON.parse(data.toString("utf-8"));
    const convertedData = this.converter ? this.converter(receiveData) : receiveData;
    this.subscriptions.forEach((subscription) => {
      subscription.onData(convertedData);
    });
  }

  private handleError(error: Error) {
    this.subscriptions.forEach((subscription) => {
      if (subscription.onError) {
        subscription.onError(error);
      }
    });
  }

  private handleClose() {
    this.subscriptions.forEach((subscription) => {
      if (subscription.onClose) {
        subscription.onClose();
      }
    });
  }
}
