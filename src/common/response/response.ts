import { IResponseStatus } from '../enum'
import { IResponse } from './response.interface'
import {
  PACKAGE_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '../error/error.constants'
import { Exchange } from '../../exchange/enums/exchange.enum'
import { IUpbitError, UPBIT_ERROR } from '../../upbit/upbit.error'
import { BITHUMB_ERROR, IBithumbError } from '../../bithumb/bithumb.error'
import { COINONE_ERROR, ICoinoneError } from '../../coinone/coinone.error'

export const responseWarp = async <T>(
  job: () => Promise<T>,
  exchange: Exchange
): Promise<IResponse<T>> => {
  try {
    const data: T = await job()
    return {
      status: IResponseStatus.ok,
      result: data,
    }
  } catch (e) {
    if (
      e instanceof TypeError ||
      e instanceof SyntaxError ||
      e instanceof RangeError ||
      e instanceof ReferenceError
    ) {
      return {
        status: IResponseStatus.error,
        result: { message: PACKAGE_ERROR_MESSAGE },
      }
    }

    let message = UNKNOWN_ERROR_MESSAGE
    switch (exchange) {
      case Exchange.upbit: {
        const data: IUpbitError = e.response.data
        const msg = UPBIT_ERROR[data.error.name]
        if (msg != undefined) message = msg
        break
      }
      case Exchange.bithumb: {
        const data: IBithumbError = e.response.data
        const msg = BITHUMB_ERROR[data.message]
        if (msg != undefined) message = msg
        break
      }
      case Exchange.coinone: {
        const data: ICoinoneError = e.response.data
        console.log(data)
        const msg = COINONE_ERROR[data.error_msg]
        if (msg != undefined) message = msg
        break
      }
      case Exchange.korbit: {
        break
      }
    }

    return {
      status: IResponseStatus.error,
      result: {
        message,
      },
    }
  }
}
