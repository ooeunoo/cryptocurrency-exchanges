import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from "axios";

export enum method {
  "get" = "GET",
  "post" = "POST",
}

export const request = async <T>(
  method: method,
  baseUrl: string,
  endpoint: string,
  options?: {
    params?: any;
    data?: any;
    converter?: any;
  },
) => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      params: options?.params,
      data: options?.data,
    });

    return options?.converter ? options.converter(response.data) : response.data;
  } catch (e: any) {
    // TODO: 에러처리
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
    data?: any;
    params?: any;
    converter?: any;
  },
) => {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      headers,
      params: options?.params,
      data: options?.data,
    });

    return options?.converter ? options.converter(response.data) : response.data;
  } catch (e: any) {
    // TODO: 에러처리
    console.log(e.response);
    throw new Error(e);
  }
};
