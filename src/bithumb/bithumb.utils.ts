import * as crypto from "crypto";
import * as queystring from "querystring";

export const getHeaders = (
  endpoint: string,
  parameters: any = {},
  apiKey,
  secretKey,
) => {
  const nonce = new Date().getTime();
  const requestSignature = `${endpoint}${String.fromCharCode(0)}${queystring.encode(parameters)}${String.fromCharCode(0)}${nonce}`;
  const hmacSignature = Buffer.from(
    crypto
      .createHmac("sha512", secretKey)
      .update(requestSignature)
      .digest("hex"),
  ).toString("base64");

  return {
    "Api-Key": apiKey,
    "Api-Sign": hmacSignature,
    "Api-Nonce": nonce,
  };
};
