import { Upbit } from "./upbit";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { UPBIT_PUBLIC_STREAM_DATA_TYPE, UPBIT_WEBSOCKET_URL } from "./upbit.constant";
import { WebSocketClient } from "@exchange/exchange.socket";
import { upbitSubscribeTickerConverter } from "./upbit.converter";

describe("UPBIT", () => {
  let upbit: Upbit;
  beforeAll(async () => {
    const env = dotenv.config({
      path: path.join(__dirname, "..", "..", ".env"),
    }).parsed;

    upbit = new Upbit(env.UPBIT_ACCESS_KEY, env.UPBIT_SECRET_KEY);
  });

  // it("Fetch Tickers", async () => {
  //   const result = await upbit.fetchTickers();
  //   console.log(result);
  // });

  // it("Fetch Wallet Status", async () => {
  //   const result = await upbit.fetchWalletStatus();
  //   console.log(result);
  // });

  // it("Fetch Balances", async () => {
  //   const result = await upbit.fetchBalances();
  //   console.log(result);
  // });

  // it("Fetch Deposit Histories", async () => {
  //   const result = await upbit.fetchDepositHistory("ETH");
  //   console.log(result);
  // });

  // it("Fetch Withdraw History", async () => {
  //   const result = await upbit.fetchWithdrawHistory("TRX");
  //   console.log(result);
  // });

  // it("Fetch Deposit Addresses", async () => {
  //   const result = await upbit.fetchDepositAddresses();
  //   console.log(result);
  // });

  // it("Fetch Order History", async () => {
  //   const result = await upbit.fetchOrderHistory("TRX", "KRW");
  //   console.log(result);
  // });
  // it("Fetch All Order History", async () => {
  //   const result = await upbit.fetchAllOrderHistory();
  //   // console.log(result);
  //   const jsonResult = JSON.stringify(result, null, 2);
  //   // console.log(jsonResult);
  //   // Write the JSON string to data.json file
  //   fs.writeFileSync("data.json", jsonResult);
  // });
  it("Stream public data", async (done) => {
    const ws = await upbit.subscribePublicData(UPBIT_PUBLIC_STREAM_DATA_TYPE.ticker);
    while (true) {
      const result = await ws.get();
      console.log(result);
    }
  });
  xit("asdf", async () => {
    const data = [
      { ticket: "4bbdd9a7-c6a9-4872-8e8a-bcd456a05bc8" },
      {
        type: "ticker",
        codes: [
          "KRW-BTC",
          "KRW-ETH",
          "BTC-ETH",
          "BTC-XRP",
          "BTC-ETC",
          "BTC-CVC",
          "BTC-DGB",
          "BTC-SC",
          "BTC-SNT",
          "BTC-WAVES",
          "BTC-NMR",
          "BTC-XEM",
          "BTC-QTUM",
          "BTC-BAT",
          "BTC-LSK",
          "BTC-STEEM",
          "BTC-DOGE",
          "BTC-BNT",
          "BTC-XLM",
          "BTC-ARDR",
          "BTC-ARK",
          "BTC-STORJ",
          "BTC-GRS",
          "BTC-RLC",
          "USDT-BTC",
          "USDT-ETH",
          "USDT-XRP",
          "USDT-ETC",
          "KRW-NEO",
          "KRW-MTL",
          "KRW-XRP",
          "KRW-ETC",
          "KRW-SNT",
          "KRW-WAVES",
          "KRW-XEM",
          "KRW-QTUM",
          "KRW-LSK",
          "KRW-STEEM",
          "KRW-XLM",
          "KRW-ARDR",
          "KRW-ARK",
          "KRW-STORJ",
          "KRW-GRS",
          "KRW-ADA",
          "BTC-ADA",
          "BTC-MANA",
          "KRW-SBD",
          "BTC-SBD",
          "KRW-POWR",
          "BTC-POWR",
          "KRW-BTG",
          "USDT-ADA",
          "BTC-DNT",
          "BTC-ZRX",
          "BTC-TRX",
          "BTC-TUSD",
          "BTC-LRC",
          "KRW-ICX",
          "KRW-EOS",
          "USDT-TUSD",
          "KRW-TRX",
          "BTC-POLYX",
          "USDT-SC",
          "USDT-TRX",
          "KRW-SC",
          "KRW-ONT",
          "KRW-ZIL",
          "KRW-POLYX",
          "KRW-ZRX",
          "KRW-LOOM",
          "BTC-BCH",
          "USDT-BCH",
          "KRW-BCH",
          "BTC-HIFI",
          "BTC-LOOM",
          "KRW-BAT",
          "KRW-IOST",
          "USDT-DGB",
          "KRW-CVC",
          "KRW-IQ",
          "KRW-IOTA",
          "BTC-RVN",
          "BTC-GO",
          "BTC-UPP",
          "BTC-ENJ",
          "KRW-HIFI",
          "KRW-ONG",
          "KRW-GAS",
          "BTC-MTL",
          "KRW-UPP",
          "KRW-ELF",
          "USDT-DOGE",
          "USDT-ZRX",
          "USDT-RVN",
          "USDT-BAT",
          "KRW-KNC",
          "BTC-MOC",
          "BTC-ZIL",
          "KRW-BSV",
          "BTC-BSV",
        ],
        isOnlyRealtime: true,
      },
    ];
    const ws = new WebSocketClient(UPBIT_WEBSOCKET_URL, data, upbitSubscribeTickerConverter);
    (async () => {
      while (true) {
        const result = await ws.get();
        console.log(result);
      }
    })();
  });
});
