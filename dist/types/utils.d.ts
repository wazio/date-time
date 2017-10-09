/**
 * Milliseconds in time units object.
 */
export declare const msInTimeUnits: {
    day: number;
    hour: number;
    minute: number;
    second: number;
};
/**
 * Returns string value with enough zeros at the beginning to match expectedLength param.
 *
 * @param value: number|string
 * @param expectedLength: number
 * @returns {string}
 */
export declare function addZeroPrefix(value: number | string, expectedLength: number): string;
/**
 * For positive number returns largest integer less than or equal to a given number and
 * for negative number returns largest integer grater than or equal to a given number
 *
 * @param value: number
 * @returns {number}
 */
export declare function relativeFloor(value: number): number;
/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a target object.
 * Returns the target object.
 * ES6 polyfill.
 *
 * @param target: object
 * @param sources: any[]
 * @returns {any}
 */
export declare function assign(target: object, ...sources: any[]): any;
/**
 * Returns the sign of the x, indicating whether x is positive, negative or zero.
 * ES6 polyfill.
 *
 * @param x: number
 * @returns {number}
 */
export declare function sign(x: number): 1 | 0 | -1;
