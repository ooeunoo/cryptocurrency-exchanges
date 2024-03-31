import { Bithumb } from "@bithumb/bithumb";
import * as dotenv from "dotenv";
import * as path from "path";

describe("Bithumb", () => {
  let bithumb: Bithumb;

  beforeAll(async () => {
    const env = dotenv.config({
      path: path.join(__dirname, "..", "..", ".env"),
    }).parsed;

    bithumb = new Bithumb(env.BITHUMB_CONNECT_KEY, env.BITHUMB_SECRET_KEY);
  });
  it("1.Fetch Tickers", async () => {
    const result = await bithumb.fetchTickers();
    console.log(result);
  });

  it("2. Fetch Wallet Status", async () => {
    const result = await bithumb.fetchWalletStatus();
    console.log(result);
  });
  it("3. Fetch Balances", async () => {
    const result = await bithumb.fetchBalances();
    console.log(result);
  });

  it("4. Fetch Deposit Addresses", async () => {
    const result = await bithumb.fetchDepositAddresses();
    console.log(result);
  });

  it("5.Fetch Deposit Histories", async () => {
    const result = await bithumb.fetchDepositHistory("XRP");
    console.log(result);
  });

  it("6. Fetch Withdraw History", async () => {
    const result = await bithumb.fetchWithdrawHistory("ETC");
    console.log(result);
  });

  it("7. Fetch Order History", async () => {
    const result = await bithumb.fetchOrderHistory("WEMIXC");
    console.log(result);
  });
});
