import * as dotenv from "dotenv";
import * as path from "path";
import { Coinone } from "./coinone";

describe("COINONE", () => {
  describe("PUBLIC", () => {
    let coinone: Coinone;
    beforeAll(async () => {
      coinone = new Coinone();
    });

    it("Fetch Tickers", async () => {
      const result = await coinone.fetchTickers();
      console.log(result);
    });

    it("Fetch Wallet Status", async () => {
      const result = await coinone.fetchWalletStatus();
      console.log(result);
    });
  });

  describe("PRIVATE", () => {
    let coinone: Coinone;

    beforeAll(async () => {
      const env = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env"),
      }).parsed;
      coinone = new Coinone(env.COINONE_ACCESS_KEY, env.COINONE_SECRET_KEY);
    });

    
    it("Fetch Balances", async () => {
      const result = await coinone.fetchBalances();
      console.log(result);
    });

    // it("Fetch Deposit Addresses", async () => {
    //   const result = await korbit.fetchDepositAddress();
    //   console.log(result);
    // });

    // it("Fetch Deposit Histories", async () => {
    //   const result = await upbit.fetchDepositHistory("BTC");
    //   console.log(result);
    // });

    // it("Fetch Withdraw History", async () => {
    //   const result = await upbit.fetchWithdrawHistory("BTC");
    //   console.log(result);
    // });

    // it("Fetch Order History", async () => {
    //   const result = await upbit.fetchOrderHistory("BTC");
    //   console.log(result);
    // });
  });
});
