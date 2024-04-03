import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 100 })

/**
 * To BigNumber
 * @param value 값
 * @returns BigNumber
 */
export function toBigNumberString(value: BigNumber.Value): string {
  if (value == undefined || value == null) return toBigNumberString(0)
  return new BigNumber(value.toString()).toString()
}

/**
 * 제로 여부 조회
 * @param value 값
 * @returns 제로 여부
 */
export function isZero(value: BigNumber.Value): boolean {
  return new BigNumber(value.toString()).isZero()
}

/**
 * 고정 소수점 변환
 * @param value 값
 * @param point 소수점 뒤 자릿수
 * @returns 고정 소수점 표기된 값
 */
export function toFixed(value: BigNumber.Value, point = 20): string {
  return new BigNumber(value.toString()).toFixed(point)
}

/**
 * 기존 값의 부정값
 * @param value 값
 * @returns 부정 값
 */
export function toNegated(value: BigNumber.Value): BigNumber {
  return new BigNumber(value.toString()).negated()
}

/**
 * 쉬프트 연산
 * @param value 값
 * @param n 자리값 이동 (음수: 왼쪽, 양수: 오른쪽)
 * @returns 이동 연산된 값
 */
export function shift(value: BigNumber.Value, n: number): BigNumber {
  return new BigNumber(value.toString()).shiftedBy(n)
}

/**
 * 더하기
 * @param a a
 * @param b b
 * @returns 더한 값
 */
export function add(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a.toString()).plus(b.toString())
}

/**
 * 빼기
 * @param a a
 * @param b b
 * @returns 뺀 값
 */
export function sub(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a.toString()).minus(b.toString())
}

/**
 * 곱하기
 * @param a a
 * @param b b
 * @returns 곱한 값
 */
export function mul(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a.toString()).multipliedBy(b.toString())
}

/**
 * 나누기
 * @param a a
 * @param b b
 * @returns 나눈 값
 */
export function div(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a.toString()).div(b.toString())
}

/**
 * 제곱 값
 * @param a a
 * @param b 승수
 * @returns 제곱 값
 */
export function pow(a: BigNumber.Value, b: BigNumber.Value): BigNumber {
  return new BigNumber(a.toString()).pow(b.toString())
}

/**
 * a가 b보다 큰가
 * @param a a
 * @param b b
 * @returns boolean
 */
export function isGreaterThan(a: BigNumber.Value, b: BigNumber.Value): boolean {
  return new BigNumber(a.toString()).isGreaterThan(b.toString())
}

/**
 * a가 b보다 크거나 같은가
 * @param a a
 * @param b b
 * @returns boolean
 */
export function isGreaterThanOrEqual(
  a: BigNumber.Value,
  b: BigNumber.Value
): boolean {
  return new BigNumber(a.toString()).isGreaterThanOrEqualTo(b.toString())
}

/**
 * a가 b보다 작은가
 * @param a a
 * @param b b
 * @returns boolean
 */
export function isLessThan(a: BigNumber.Value, b: BigNumber.Value): boolean {
  return new BigNumber(a.toString()).isLessThan(b.toString())
}

/**
 * a가 b보다 작거나 같은가
 * @param a a
 * @param b b
 * @returns boolean
 */
export function isLessThanOrEqual(
  a: BigNumber.Value,
  b: BigNumber.Value
): boolean {
  return new BigNumber(a.toString()).isLessThanOrEqualTo(b.toString())
}
