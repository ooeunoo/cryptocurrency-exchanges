import axios, { AxiosHeaders, AxiosResponse, RawAxiosRequestHeaders } from "axios";

export enum Method {
  "GET" = "GET",
  "POST" = "POST",
}

export const requestPublic = async <T>(baseUrl: string, endpoint: string, params: any, converter: any) => {
  try {
    const response: AxiosResponse<T> = await axios({
      method: Method.GET,
      url: `${baseUrl}${endpoint}`,
      params: params,
    });

    return converter(response.data);
  } catch (e) {
    // TODO: error handling
    console.log(e);
    throw new Error(e);
  }
};

export const requestSign = async <T>(
  method: Method,
  baseUrl: string,
  endpoint: string,
  headers: RawAxiosRequestHeaders,
  data: any,
  params: any,
  converter: any,
) => {
  // console.log(method, baseUrl, endpoint, headers);
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      headers,
      params,
      data,
    });
    return converter(response.data);
  } catch (e) {
    // TODO: error handling
    console.log(e.response);
    throw new Error(e);
  }
};
