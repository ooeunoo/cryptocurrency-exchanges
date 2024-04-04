import { IResponseStatus } from '../enum'

export interface IResponse<T> {
  status: IResponseStatus
  result: T | IResponseErrorMessage
}

export interface IResponseErrorMessage {
  message: string
}
