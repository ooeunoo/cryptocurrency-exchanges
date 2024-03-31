import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { UPBIT_PUBLIC_STREAM_DATA_TYPE, UPBIT_WEBSOCKET_URL } from "./upbit.constant";
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

  it("Fetch Tickers", async () => {
    const result = await upbit.fetchTickers();
    console.log(result);
  });

  it("Fetch Wallet Status", async () => {
    const result = await upbit.fetchWalletStatus();
    console.log(result);
  });

  it("Fetch Balances", async () => {
    const result = await upbit.fetchBalances();
    console.log(result);
  });

  it("Fetch Deposit Histories", async () => {
    const result = await upbit.fetchDepositHistory("ETH");
    console.log(result);
  });

  it("Fetch Withdraw History", async () => {
    const result = await upbit.fetchWithdrawHistory("TRX");
    console.log(result);
  });

  it("Fetch Deposit Addresses", async () => {
    const result = await upbit.fetchDepositAddresses();
    console.log(result);
  });

  it("Fetch Order History", async () => {
    const result = await upbit.fetchOrderHistory("TRX", "KRW");
    console.log(result);
  });
  it("Fetch All Order History", async () => {
    const result = await upbit.fetchAllOrderHistory();
    // console.log(result);
    const jsonResult = JSON.stringify(result, null, 2);
    // console.log(jsonResult);
    // Write the JSON string to data.json file
    fs.writeFileSync("data.json", jsonResult);
  });
  it("Stream public data", async (done) => {
    const ws = await upbit.subscribePublicData(UPBIT_PUBLIC_STREAM_DATA_TYPE.ticker);

    const subscription: WebSocketSubscription = {
      onData: (receivedData) => {
        console.log("Received data:", receivedData);
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
});
