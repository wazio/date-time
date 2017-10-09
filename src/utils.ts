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
  return sign(value) * Math.floor(Math.abs(value));
}

/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a target object.
 * Returns the target object.
 * ES6 polyfill.
 *
 * @param target: object
 * @param sources: any[]
 * @returns {any}
 */
export function assign(target: object, ...sources: any[]): any {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      (target as any)[key] = (source as any)[key];
    });
  });

  return target as any;
}

/**
 * Returns the sign of the x, indicating whether x is positive, negative or zero.
 * ES6 polyfill.
 *
 * @param x: number
 * @returns {number}
 */
export function sign(x: number): 1 | 0 | -1 {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}
