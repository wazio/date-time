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
