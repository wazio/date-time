/**
 * TimeSpan class
 *
 * Represents a time interval.
 */
export declare class TimeSpan {
    private _days;
    private _hours;
    private _minutes;
    private _seconds;
    private _milliseconds;
    private _totalDays;
    private _totalHours;
    private _totalMinutes;
    private _totalSeconds;
    private _totalMilliseconds;
    constructor(milliseconds: number);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    /**
     * Returns the days component of the time interval represented by the current TimeSpan structure.
     *
     * @returns {number}
     */
    readonly days: number;
    /**
     * Returns the hours component of the time interval represented by the current TimeSpan structure.
     *
     * @returns {number}
     */
    readonly hours: number;
    /**
     * Returns the minutes component of the time interval represented by the current TimeSpan structure.
     *
     * @returns {number}
     */
    readonly minutes: number;
    /**
     * Returns the seconds component of the time interval represented by the current TimeSpan structure.
     *
     * @returns {number}
     */
    readonly seconds: number;
    /**
     * Returns the milliseconds component of the time interval represented by the current TimeSpan structure.
     *
     * @returns {number}
     */
    readonly milliseconds: number;
    /**
     * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional days.
     *
     * @returns {number}
     */
    readonly totalDays: number;
    /**
     * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional hours.
     *
     * @returns {number}
     */
    readonly totalHours: number;
    /**
     * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional minutes.
     *
     * @returns {number}
     */
    readonly totalMinutes: number;
    /**
     * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional seconds.
     *
     * @returns {number}
     */
    readonly totalSeconds: number;
    /**
     * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional milliseconds.
     *
     * @returns {number}
     */
    readonly totalMilliseconds: number;
}
