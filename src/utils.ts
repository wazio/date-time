/**
 * Milliseconds in time units object.
 */
export const msInTimeUnits = {
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
};

/**
 * Returns string value with enough zeros at the beginning to match expectedLength param.
 *
 * @param value: number|string
 * @param expectedLength: number
 * @returns {string}
 */
export function addZeroPrefix(value: number | string, expectedLength: number): string {
  let stringValue: string = value.toString();
  let zeroCount: number = expectedLength - stringValue.length;
  while (zeroCount-- > 0) stringValue = '0' + stringValue;

  return stringValue;
}

/**
 * For positive number returns largest integer less than or equal to a given number and
 * for negative number returns largest integer grater than or equal to a given number
 *
 * @param value: number
 * @returns {number}
 */
export function relativeFloor(value: number): number {
  return Math.sign(value) * Math.floor(Math.abs(value));
}
