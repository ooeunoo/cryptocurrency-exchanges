import * as WebSocket from "ws";

export interface WebSocketSubscription {
  onData: (data: any) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export class WebSocketClient {
  public ws;

  baseUrl: string;
  data: any;

  alive: boolean;
  queueSize: number = 1000;
  queue: any[] = [];
  converter: any;
  private subscriptions: WebSocketSubscription[] = [];

  constructor(baseUrl: string, data: any, converter: any) {
    this.ws = new WebSocket(baseUrl);

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
    const index = this.subscriptions.indexOf(subscription);
    if (index !== -1) {
      this.subscriptions.splice(index, 1);
    }
  }

  private handleMessage(data: WebSocket.Data) {
    const receiveData = JSON.parse(data.toString("utf-8"));
    const convertedData = this.converter(receiveData);
    // TODO:
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
