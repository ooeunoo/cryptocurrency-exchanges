import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";

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
});
