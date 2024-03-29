import { Bithumb } from "@bithumb/bithumb";
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

    it("Fetch Market Price", async () => {
      const result = await bithumb.fetchMarketsPrices([]);
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
      const result = await bithumb.fetchBalances();
      console.log(result);
    });

    it("Fetch Deposit Histories", async () => {
      const result = await bithumb.fetchDepositHistory("ETH");
      console.log(result);
    });

    it("Fetch Withdraw History", async () => {
      const result = await bithumb.fetchWithdrawHistory("ETC");
      console.log(result);
    });

    it("Fetch Deposit Addresses", async () => {
      const result = await bithumb.fetchDepositAddress("ETH", "ETH");
      console.log(result);
    });

    it("Fetch Order History", async () => {
      const result = await bithumb.fetchOrderHistory("WEMIXC");
      console.log(result);
    });
  });
});
