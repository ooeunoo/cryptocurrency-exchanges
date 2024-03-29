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

    it("Fetch Market Prices", async () => {
      const markets = await upbit.fetchMarkets();
      const result = await upbit.fetchMarketsPrices(markets.map(({ currency, unit }) => `${unit}-${currency}`));
      console.log(result);
    });
    it("Fetch Order History", async () => {
      const result = await upbit.fetchOrderHistory("BTC");
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
      const result = await upbit.fetchBalances();
      console.log(result);
    });

    it("Fetch Deposit Histories", async () => {
      const result = await upbit.fetchDepositHistory("TRX");
      console.log(result);
    });

    it("Fetch Withdraw History", async () => {
      const result = await upbit.fetchWithdrawHistory("TRX");
      console.log(result);
    });

    it("Fetch Deposit Addresses", async () => {
      const result = await upbit.fetchDepositAddress("BTC", "BTC");
      console.log(result);
    });

    it("Fetch Order History", async () => {
      const result = await upbit.fetchOrderHistory("BTC");
      console.log(result);
    });
  });
});
