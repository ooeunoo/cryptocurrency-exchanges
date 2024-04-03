import * as dotenv from 'dotenv'
import * as path from 'path'
import { Coinone } from './coinone'
import { SubscribeType } from '../exchange/enums/exchange.subscribe.enum'

describe('coinone', () => {
  let coinone: Coinone
  beforeAll(async () => {
    const env: dotenv.DotenvParseOutput = dotenv.config({
      path: path.join(__dirname, '..', '..', '.env'),
    }).parsed as dotenv.DotenvParseOutput

    coinone = new Coinone(env.COINONE_ACCESS_KEY, env.COINONE_SECRET_KEY)
  })

  it('Fetch Markets', async () => {
    const result = await coinone.public.fetchMarkets()
    console.log(result)
  })
  it('Fetch Tickers', async () => {
    const result = await coinone.public.fetchTickers()
    console.log(result)
  })
  it('Fetch Wallet Status', async () => {
    const result = await coinone.private.fetchWalletStatus()
    console.log(result)
  })
  it('Fetch Balances', async () => {
    const result = await coinone.private.fetchBalance()
    console.log(result)
  })
  it('Fetch Deposit Addresses', async () => {
    const result = await coinone.private.fetchDepositAddress('XRP')
    console.log(result)
  })
  it('Fetch Deposit Histories', async () => {
    const result = await coinone.private.fetchDepositHistory('BTC')
    console.log(result)
  })
  it('Fetch Withdraw History', async () => {
    const result = await coinone.private.fetchWithdrawHistory('BTC')
    console.log(result)
  })
  it('Fetch Completeted Order History', async () => {
    const result = await coinone.private.fetchCompletedOrderHistory()
    console.log(result)
  })
  it('Fetch UnCompleteted Order History', async () => {
    const result = await coinone.private.fetchUnCompletedOrderHistory()
    console.log(result)
  })
  it('Subscribe public data', async () => {
    const ws = await coinone.subscribe.client(
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
