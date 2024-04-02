// import { Exchange } from "../enum";
// import { error as upbitError, IError as IUpbitError } from "../../upbit/upbit.error";
// import { error as bithumbError, IError as IBithumbError } from "../../bithumb/bithumb.error";
// import { error as korbitError, IError as IKorbitError } from "../../korbit/korbit.error";
// import { error as coinoneError, IError as ICoinoneError } from "../../coinone/coinone.error";
// import { AxiosError } from "axios";
// import { constants } from "../../upbit/upbit.constants";
// import { CustomError } from "./error.custom";

// export const CREDENTITAL_NOT_SETTED = "Credentials are not set.";

// export const handleError = <T>(e: AxiosError) => {
//   const url = e.config.url;

//   switch (true) {
//     case url.startsWith(constants.apiUrl):
//       const data = e.response.data as IUpbitError;
//       const name = data.error.name;
//       throw new CustomError(Exchange.upbit, upbitError[name]);
//   }
// };
