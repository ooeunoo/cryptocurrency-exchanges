import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";

describe("UPBIT", () => {
  describe("PUBLIC", () => {
    let upbit: Upbit;
    beforeAll(async () => {
      upbit = new Upbit();
    });

    it("Fetch Market", async () => {
      const result = await upbit.fetchMarkets();
      console.log(result);
    });
  });

  describe("PRIVATE", () => {
    let upbit: Upbit;
    beforeAll(async () => {
      const env = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env"),
      }).parsed;

      upbit = new Upbit(env.UPBIT_ACCESS_KEY, env.UPBIT_SECRET_KEY);
    });

    it("Fetch Balances", async () => {
      const result = await upbit.fetchBalance();
      console.log(result);
    });

    it("Fetch Deposit Histories", async () => {
      const result = await upbit.fetchDepositHistory({ currency: "MBL" });
      console.log(result);
    });

    it("Fetch Withdraw History", async () => {
      const result = await upbit.fetchWithdrawHistory();
      console.log(result);
    });

    it("Fetch Deposit Addresses", async () => {
      const result = await upbit.fetchDepositAddress({
        currency: "BTC",
        network: "BTC",
      });
      console.log(result);
    });

    it("Fetch Order History", async () => {
      const result = await upbit.fetchOrderHistory();
      console.log(result);
    });
  });
});
