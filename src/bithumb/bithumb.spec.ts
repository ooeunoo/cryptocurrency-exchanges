import { Bithumb } from "./bithumb";
import * as dotenv from "dotenv";
import * as path from "path";

describe("Bithumb", () => {
  describe("PUBLIC", () => {
    let bithumb: Bithumb;
    beforeAll(async () => {
      bithumb = new Bithumb();
    });

    it("Fetch Market", async () => {
      const result = await bithumb.fetchMarkets();
      console.log(result);
    });
  });

  describe("PRIVATE", () => {
    let bithumb: Bithumb;

    beforeAll(async () => {
      const env = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env"),
      }).parsed;

      bithumb = new Bithumb(env.BITHUMB_CONNECT_KEY, env.BITHUMB_SECRET_KEY);
    });

    it("Fetch Balances", async () => {
      const result = await bithumb.fetchBalance();
      console.log(result);
    });

    it("Fetch Deposit Histories", async () => {
      const result = await bithumb.fetchDepositHistory({ currency: "ETH", page: 1, limit: 10 });
      console.log(result);
    });
    // it("Fetch Withdraw History", async () => {
    //   const result = await upbit.fetchWithdrawHistory();
    //   console.log(result);
    // });

    it("Fetch Deposit Addresses", async () => {
      const result = await bithumb.fetchDepositAddress({
        currency: "ETH",
        network: "ETH",
      });
      console.log(result);
    });

    // it("Fetch Order History", async () => {
    //   const result = await upbit.fetchOrderHistory();
    //   console.log(result);
    // });
  });
});
