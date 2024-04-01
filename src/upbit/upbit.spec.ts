import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";
import { WebSocketSubscription } from "@common/websocket";
import { subscribeType } from "@common/enum";

describe("UPBIT", () => {
  let upbit: Upbit;

  beforeAll(() => {
    const env = dotenv.config({
      path: path.join(__dirname, "..", "..", ".env"),
    }).parsed;

    upbit = new Upbit(env.UPBIT_ACCESS_KEY, env.UPBIT_SECRET_KEY);
  });

  it("Markets", async () => {
    const result = await upbit.public.fetchMarkets();
    console.log(result);
  });

  it("Tickers", async () => {
    const result = await upbit.public.fetchTickers();
    console.log(result);
  });

  it("Wallet Status", async () => {
    const result = await upbit.private.fetchWalletStatus();
    console.log(result);
  });

  it("Balances", async () => {
    const result = await upbit.private.fetchBalance();
    console.log(result);
  });

  it("Deposit Histories", async () => {
    const result = await upbit.private.fetchDepositHistory("TRX");
    console.log(result);
  });

  it("Withdraw History", async () => {
    const result = await upbit.private.fetchWithdrawHistory("TRX");
    console.log(result);
  });

  it("Deposit Addresses", async () => {
    const result = await upbit.private.fetchDepositAddress();
    console.log(result);
  });

  it("Completed Order History", async () => {
    const result = await upbit.private.fetchCompletedOrderHistory();
    console.log(result);
  });

  it("Uncompleted Order History", async () => {
    const result = await upbit.private.fetchUnCompletedOrderHistory();
    console.log(result);
  });

  it("Subscribe Data", async () => {
    const client = await upbit.subscribe.client(subscribeType.orderbook, 'BTC', 'KRW');

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

    client.subscribe(subscription);
  });
});
