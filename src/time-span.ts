import { msInTimeUnits, relativeFloor } from './utils';

/**
 * TimeSpan class
 *
 * Represents a time interval.
 */
export class TimeSpan {
  private _days: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  private _milliseconds: number;
  private _totalDays: number;
  private _totalHours: number;
  private _totalMinutes: number;
  private _totalSeconds: number;
  private _totalMilliseconds: number;

  constructor(milliseconds: number);
  constructor(hours: number, minutes: number, seconds: number);
  constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number);
  constructor(a: number, b?: number, c?: number, d?: number, e?: number) {
    if (b === undefined || c === undefined) {
      this._totalMilliseconds = a;
    } else if (d === undefined) {
      this._totalMilliseconds = a * msInTimeUnits.hour + b * msInTimeUnits.minute + c * msInTimeUnits.second;
    } else {
      this._totalMilliseconds =
        a * msInTimeUnits.day + b * msInTimeUnits.hour + c * msInTimeUnits.minute + d * msInTimeUnits.second + (e || 0);
    }
  }

  /**
   * Returns the days component of the time interval represented by the current TimeSpan structure.
   *
   * @returns {number}
   */
  get days(): number {
    return this._days || (this._days = relativeFloor(this._totalMilliseconds / msInTimeUnits.day));
  }

  /**
   * Returns the hours component of the time interval represented by the current TimeSpan structure.
   *
   * @returns {number}
   */
  get hours(): number {
    return this._hours || (this._hours = relativeFloor((this._totalMilliseconds / msInTimeUnits.hour) % 24));
  }

  /**
   * Returns the minutes component of the time interval represented by the current TimeSpan structure.
   *
   * @returns {number}
   */
  get minutes(): number {
    return this._minutes || (this._minutes = relativeFloor((this._totalMilliseconds / msInTimeUnits.minute) % 60));
  }

  /**
   * Returns the seconds component of the time interval represented by the current TimeSpan structure.
   *
   * @returns {number}
   */
  get seconds(): number {
    return this._seconds || (this._seconds = relativeFloor((this._totalMilliseconds / msInTimeUnits.second) % 60));
  }

  /**
   * Returns the milliseconds component of the time interval represented by the current TimeSpan structure.
   *
   * @returns {number}
   */
  get milliseconds(): number {
    return this._milliseconds || (this._milliseconds = relativeFloor(this._totalMilliseconds % 1000));
  }

  /**
   * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional days.
   *
   * @returns {number}
   */
  get totalDays(): number {
    return this._totalDays || (this._totalDays = this._totalMilliseconds / msInTimeUnits.day);
  }

  /**
   * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional hours.
   *
   * @returns {number}
   */
  get totalHours(): number {
    return this._totalHours || (this._totalHours = this._totalMilliseconds / msInTimeUnits.hour);
  }

  /**
   * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional minutes.
   *
   * @returns {number}
   */
  get totalMinutes(): number {
    return this._totalMinutes || (this._totalMinutes = this._totalMilliseconds / msInTimeUnits.minute);
  }

  /**
   * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional seconds.
   *
   * @returns {number}
   */
  get totalSeconds(): number {
    return this._totalSeconds || (this._totalSeconds = this._totalMilliseconds / msInTimeUnits.second);
  }

  /**
   * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional milliseconds.
   *
   * @returns {number}
   */
  get totalMilliseconds(): number {
    return this._totalMilliseconds;
  }
}
