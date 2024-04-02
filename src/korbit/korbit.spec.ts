import * as dotenv from "dotenv";
import * as path from "path";
import { Korbit } from "./korbit";
import { subscribeType } from "../common/enum";

describe("KORBIT", () => {
  let korbit: Korbit;
  beforeAll(async () => {
    const env: dotenv.DotenvParseOutput = dotenv.config({
      path: path.join(__dirname, "..", "..", ".env"),
    }).parsed;

    korbit = new Korbit(env.KORBIT_API_KEY, env.KORBIT_SECRET_KEY);
  });

  it("Fetch Markets", async () => {
    const result = await korbit.public.fetchMarkets();
    console.log(result);
  });
  it("Fetch Tickers", async () => {
    const result = await korbit.public.fetchTickers();
    console.log(result);
  });
  it("Fetch Wallet Status", async () => {
    const result = await korbit.private.fetchWalletStatus();
    console.log(result);
  });
  it("Fetch Balances", async () => {
    const result = await korbit.private.fetchBalance();
    console.log(result);
  });
  it("Fetch Deposit Addresses", async () => {
    const result = await korbit.private.fetchDepositAddress("BTC");
    console.log(result);
  });
  it("Fetch Deposit Histories", async () => {
    const result = await korbit.private.fetchDepositHistory("BTC");
    console.log(result);
  });
  it("Fetch Withdraw History", async () => {
    const result = await korbit.private.fetchWithdrawHistory("BTC");
    console.log(result);
  });
  it("Fetch Completeted Order History", async () => {
    const result = await korbit.private.fetchCompletedOrderHistory();
    console.log(result);
  });
  it("Fetch UnCompleteted Order History", async () => {
    const result = await korbit.private.fetchUnCompletedOrderHistory();
    console.log(result);
  });
  it("Subscribe public data", async () => {
    const ws = await korbit.subscribe.client(subscribeType.ticker, "BTC", "KRW");
    ws.subscribe({
      onData: (data) => {
        console.log(data);
      },
    });
  });
});
