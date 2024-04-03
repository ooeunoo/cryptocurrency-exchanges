import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios'
import { TRequestData, TRequestParam } from './request.interface'

export enum method {
  'get' = 'GET',
  'post' = 'POST',
}

export const request = async <T>(
  method: method,
  baseUrl: string,
  endpoint: string,
  options?: {
    params?: TRequestParam
    data?: TRequestData
  }
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${baseUrl}${endpoint}`,
      params: options?.params,
      data: options?.data,
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((e: AxiosError) => {
        reject(e)
      })
  })
}

export const requestAuth = async <T>(
  method: method,
  baseUrl: string,
  endpoint: string,
  headers: RawAxiosRequestHeaders,
  options?: {
    params?: TRequestParam
    data?: TRequestData
  }
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${baseUrl}${endpoint}`,
      headers,
      params: options?.params,
      data: options?.data,
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((e: AxiosError) => {
        reject(e)
      })
  })
}
