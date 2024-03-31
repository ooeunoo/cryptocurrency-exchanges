import * as WebSocket from "ws";

export class WebSocketClient {
  public ws;

  baseUrl: string;
  data: any;

  alive: boolean;
  queueSize: number = 1000;
  queue: any[] = [];
  converter: any;

  constructor(baseUrl: string, data: any, converter: any) {
    this.ws = new WebSocket(baseUrl);

    this.data = data;
    this.alive = false;
    this.converter = converter;

    this.ws.on("message", this.handleMessage.bind(this));
  }

  connectSocket() {
    this.ws.on("open", () => {
      this.ws.send(JSON.stringify(this.data));
    });

    this.ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    this.ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }

  run() {
    this.connectSocket();
  }

  async get() {
    if (!this.alive) {
      this.alive = true;
      this.run();
    }
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (this.queue.length > 0) {
          clearInterval(intervalId);
          resolve(this.queue.shift());
        }
      }, 100);
    });
  }

  terminate() {
    this.alive = false;
    if (this.ws) {
      this.ws.terminate();
    }
  }

  private handleMessage(data: WebSocket.Data) {
    const receiveData = JSON.parse(data.toString("utf-8"));
    const convertedData = this.converter(receiveData);
    this.queue.push(convertedData);
    if (this.queue.length > this.queueSize) {
      this.queue.shift();
    }
  }
}
