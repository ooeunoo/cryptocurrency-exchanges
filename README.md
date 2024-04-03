# cryptocurrency-exchanges (Proceeding)
Cryptocurrency Excahnges API Wrapper

## 문서 (Documentation)

Proceeding

## 설치 (Installation)

```sh
npm install cryptocurrency-exchanges
```

## 지원 거래소 (Support Exchange) 

- Upbit
- Bithumb
- Coinone
- Korbit


## 사용 (Usage)
```ts
import { Upbit } from "cryptocurrency-exchanges"
```

### 공개 (Public)



- **fetchMarkets**: 거래소에서 지원하는 모든 종목 목록
```ts
const upbit = new Upbit()
const markets = await upbit.public.fetchMarkets()
```
```
[
  { currency: 'BTC', unit: 'KRW' }, 
  { currency: 'ETH', unit: 'KRW' },
  ...
]
```




- **fetchTickers**: 모든 종목 별 가격(open, last, high, low) 목록
```ts
const upbit = new Upbit()
const tickers = await upbit.public.fetchTickers()
```
```
[
  { currency: 'BTC', unit: 'KRW', high: '97300000', low: '94682000', first: '96053000', last: '95740000' },
  { currency: 'ETH', unit: 'KRW', high: '4879000', low: '4701000', first: '4808000', last: '4797000' },
  ...
]
```



### 비공개 (Private) 
- **fetchWalletStatus**: 거래소의 모든 입출금 지갑 상태 목록
```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const walletStatus = await upbit.private.fetchWalletStatus();
```
```
[  
  { currency: 'BTC', network: 'BTC', deposit: true, withdraw: true, withdrawFee: null, withdrawMin: null },
  { currency: 'ETH', network: 'ETH', deposit: true, withdraw: true, withdrawFee: null, withdrawMin: null },
  ...
]
```




- **fetchBalance**: 나의 지갑 잔고 조회
```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const walletStatus = await upbit.private.fetchBalance();
```
```
[  
  { currency: 'KRW', balance: '1000000', lockedBalance: '0', avgBuyPrice: '0' },
  { currency: 'BTC', balance: '0.322', locedBalance: '0.1', avgBuyPrice: '97300000' },
  ...
]
```


- **fetchDepositAddress([currency], [network])**: 나의 입금 주소 조회
```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const depositAddress = await upbit.private.fetchDepositAddress('BTC', 'BTC');
```
```
{
  currency: 'BTC',
  network: 'BTC',
  address: '381oLSdWUW9vNBTFNQe9pjRXKPiwpUYedx',
  memo: null
}
```




- **fetchDepositHistory([currency], [page], [limit])**: 나의 입금 내역 조회<br>
```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const depositAddress = await upbit.private.fetchDepositHistory('TRX');
```
```
[
  {
    type: 'deposit',
    txId: '4230748d66d504bdd803efdfd4f2f73a46ff629d2b8adf81ca53d43096fb1ad2',
    currency: 'TRX',
    network: 'TRX',
    amount: '100',
    fee: '0',
    state: 'accepted',
    fromAddress: null,
    fromAddressTag: null,
    toAddress: null,
    toAddressTag: null,
    createdAt: 1711530114000,
    confirmedAt: 1711530142000
  },
  {
    type: 'deposit',
    txId: 'fd44a0c324f089c48fsdf0f5311b66eddcb01280b86dcbb0930d931c35893888',
    currency: 'TRX',
    network: 'TRX',
    amount: '2170.9259',
    fee: '0',
    state: 'accepted',
    fromAddress: null,
    fromAddressTag: null,
    toAddress: null,
    toAddressTag: null,
    createdAt: 1705118617000,
    confirmedAt: 1705118652000
  }
]
```






- **fetchWithdrawHistory([currency], [page], [limit])**: 나의 출금 내역 조회<br>


```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const depositAddress = await upbit.private.fetchWithdrawHistory('TRX');
```
```
[
  {
    type: 'withdraw',
    txId: 'e13946e92f11243c6dbdsafasd619c2243eda33777651591353b40ea24c2f1bc',
    currency: 'TRX',
    network: null,
    amount: '6797',
    fee: '1',
    state: 'accepted',
    fromAddress: null,
    fromAddressTag: null,
    toAddress: null,
    toAddressTag: null,
    createdAt: 1693584391000,
    confirmedAt: 1693584623000
  },
  {
    type: 'withdraw',
    txId: '8311093590e007af10f59asdf0c7cf5ac4417db888f7b56ab027cca208e9b757',
    currency: 'TRX',
    network: null,
    amount: '19000',
    fee: '1',
    state: 'accepted',
    fromAddress: null,
    fromAddressTag: null,
    toAddress: null,
    toAddressTag: null,
    createdAt: 1693199728000,
    confirmedAt: 1693199948000
  },
]
```




### 구독 (subscribe)

- **client**: 구독 클라이언트 생성
```ts
const upbit = new Upbit([AccessKey], [SecretKey]);
const client = await upbit.private.subscribe('ticker', 'BTC', 'KRW');

const subscription =  {
  onData: function (data)  {
    console.log('on ticker data: ', data)
  },
  onError: function (error) {
    console.log('on error:', error)
  },
  onClose: function () {
    console.log('closed')
  }
}

client.subscribe(subscription)
```
```
on data: {
  "currency":"BTC",
  "unit":"KRW",
  "high":"97300000",
  "low":"94682000",
  "first":"96053000",
  "last":"95796000",
  "change":"fall",
  "accTradeVolume":"2773.75263542",
  "accTradeVolume24h":"539033044149.2787",
  "accTradePrice":"266769593726.39584",
  "accTradePrice24h":"539033044149.2787",
  "timestamp":1712143721393
}

```