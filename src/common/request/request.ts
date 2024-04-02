import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { TRequestData, TRequestParam } from "./request.interface";

export enum method {
  "get" = "GET",
  "post" = "POST",
}

export const request = async <T>(
  method: method,
  baseUrl: string,
  endpoint: string,
  options?: {
    params?: TRequestParam;
    data?: TRequestData;
  },
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      params: options?.params,
      data: options?.data,
    });

    return response.data;
  } catch (e) {
    console.log(e.response);
    throw new Error(e);
  }
};

export const requestAuth = async <T>(
  method: method,
  baseUrl: string,
  endpoint: string,
  headers: RawAxiosRequestHeaders,
  options?: {
    params?: TRequestParam;
    data?: TRequestData;
  },
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      headers,
      params: options?.params,
      data: options?.data,
    });

    return response.data;
  } catch (e) {
    // TODO: 에러처리
    console.log(e.response);
    throw new Error(e);
  }
};
