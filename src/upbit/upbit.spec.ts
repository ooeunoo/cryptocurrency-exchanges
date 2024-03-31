import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { UPBIT_PRIVATE_STREAM_DATA_TYPE, UPBIT_PUBLIC_STREAM_DATA_TYPE, UPBIT_WEBSOCKET_URL } from "./upbit.constant";
import { WebSocketClient, WebSocketSubscription } from "@exchange/exchange.socket";
import { upbitSubscribeTickerConverter } from "./upbit.converter";

describe("UPBIT", () => {
  let upbit: Upbit;
  beforeAll(async () => {
    const env = dotenv.config({
      path: path.join(__dirname, "..", "..", ".env"),
    }).parsed;

    upbit = new Upbit(env.UPBIT_ACCESS_KEY, env.UPBIT_SECRET_KEY);
  });

  it("1. Fetch Tickers", async () => {
    const result = await upbit.fetchTickers();
    console.log(result);
  });

  it("2. Fetch Wallet Status", async () => {
    const result = await upbit.fetchWalletStatus();
    console.log(result);
  });

  it("3. Fetch Balances", async () => {
    const result = await upbit.fetchBalances();
    console.log(result);
  });

  it("4. Fetch Deposit Histories", async () => {
    const result = await upbit.fetchDepositHistory("ETH");
    console.log(result);
  });

  it("5. Fetch Withdraw History", async () => {
    const result = await upbit.fetchWithdrawHistory("TRX");
    console.log(result);
  });

  it("6. Fetch Deposit Addresses", async () => {
    const result = await upbit.fetchDepositAddresses();
    console.log(result);
  });

  it("7. Fetch Order History", async () => {
    const result = await upbit.fetchOrderHistory("TRX", "KRW");
    console.log(result);
  });

  it("8. Fetch All Order History", async () => {
    const result = await upbit.fetchAllOrderHistory();
    console.log(result);
  });

  it("9. Subscribe Public Data", async () => {
    const ws = await upbit.subscribePublicData(UPBIT_PUBLIC_STREAM_DATA_TYPE.orderbook);

    const subscription: WebSocketSubscription = {
      onData: (receivedData) => {
        console.log("Received data:", JSON.stringify(receivedData));
      },
      onError: (error) => {
        console.log("error", error);
      },
      onClose: () => {
        console.log("close");
      },
    };

    ws.subscribe(subscription);
  });

  it("10. Subscribe Private Data", async (done) => {
    const ws = await upbit.subscribePrivateData(UPBIT_PRIVATE_STREAM_DATA_TYPE.myTrade);

    const subscription: WebSocketSubscription = {
      onData: (receivedData) => {
        console.log("Received data:", JSON.stringify(receivedData));
      },
      onError: (error) => {
        console.log("error", error);
      },
      onClose: () => {
        console.log("close");
      },
    };

    ws.subscribe(subscription);
    done();
  });
});
