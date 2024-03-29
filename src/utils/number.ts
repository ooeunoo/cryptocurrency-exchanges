import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: 100 });

export function toBigNumberString(value: any): string {
  return new BigNumber(value.toString()).toString();
}
