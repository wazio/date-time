import { TimeSpan } from './time-span';
export interface IFormatTraverseCallback {
    (params: {
        code: string;
        isSpecifier: boolean;
        startAt: number;
        endAt: number;
    }): void;
}
export declare class DateBuilderParams {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    isAfterNoon: boolean;
}
/**
 * DateTime class
 */
export declare class DateTime {
    /**
     * Converts the value of the given Date object to its equivalent string representation using the specified format.
     *
     * @param date: Date
     * @param format: string
     * @returns {string}
     */
    static format(date: Date, format: string): string;
    /**
     * Converts the specified string representation of a date and time to its Date equivalent using the specified format.
     *
     * @param datetime: string
     * @param format: string
     * @returns {Date}
     */
    static parseExact(datetime: string, format: string): Date;
    /**
     * Returns a new TimeSpan object based on date and time subtraction between given Date objects.
     *
     * @param date1: Date
     * @param date2: Date
     * @returns {TimeSpan}
     */
    static subtract(date1: Date, date2?: Date): TimeSpan;
    /**
     * Returns a new TimeSpan object based on date subtraction between given Date objects.
     *
     * @param date1: Date
     * @param date2: Date
     * @returns {TimeSpan}
     */
    static subtractDate(date1: Date, date2?: Date): TimeSpan;
    /**
     * Returns a new Date object based od DateBuilderParams object.
     *
     * @param params: DateBuilderParams
     * @returns {Date}
     */
    private static buildDate(params);
    /**
     * Traverse given date format and trigger callback function for every format specifier from FormatSpecifiers or for
     * single, unfamiliar letter.
     *
     * @param format: string
     * @param callback: IFormatTraverseCallback
     */
    private static traverseFormat(format, callback);
}
