import * as dotenv from 'dotenv'
import * as path from 'path'
import { Bithumb } from './bithumb'
import { SubscribeType } from '../exchange/enums/exchange.subscribe.enum'

describe('bithumb', () => {
  let bithumb: Bithumb
  beforeAll(async () => {
    const env: dotenv.DotenvParseOutput = dotenv.config({
      path: path.join(__dirname, '..', '..', '.env'),
    }).parsed as dotenv.DotenvParseOutput

    bithumb = new Bithumb(env.BITHUMB_CONNECT_KEY, env.BITHUMB_SECRET_KEY)
  })

  it('Fetch Markets', async () => {
    const result = await bithumb.public.fetchMarkets()
    console.log(result)
  })
  it('Fetch Tickers', async () => {
    const result = await bithumb.public.fetchTickers()
    console.log(result)
  })
  it('Fetch Wallet Status', async () => {
    const result = await bithumb.private.fetchWalletStatus()
    console.log(result)
  })
  it('Fetch Balances', async () => {
    const result = await bithumb.private.fetchBalance()
    console.log(result)
  })
  it('Fetch Deposit Addresses', async () => {
    const result = await bithumb.private.fetchDepositAddress('BTC', 'BTC')
    console.log(result)
  })
  it('Fetch Deposit Histories', async () => {
    const result = await bithumb.private.fetchDepositHistory('WEMIX')
    console.log(result)
  })
  it('Fetch Withdraw History', async () => {
    const result = await bithumb.private.fetchWithdrawHistory('BTC')
    console.log(result)
  })
  it('Fetch Completeted Order History', async () => {
    const result = await bithumb.private.fetchCompletedOrderHistory()
    console.log(result)
  })
  it('Fetch UnCompleteted Order History', async () => {
    const result = await bithumb.private.fetchUnCompletedOrderHistory()
    console.log(result)
  })

  it('Subscribe public data', async () => {
    const ws = await bithumb.subscribe.client(
      SubscribeType.ticker,
      'BTC',
      'KRW'
    )
    ws.subscribe({
      onData: (data) => {
        console.log(data)
      },
    })
  })
})
