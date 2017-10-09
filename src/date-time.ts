import { FormatSpecifiers } from './format-specifiers';
import { FormatSpecifier } from './format-specifier';
import { TimeSpan } from './time-span';
import { assign, msInTimeUnits } from './utils';

export interface IFormatTraverseCallback {
  (
    params: {
      code: string;
      isSpecifier: boolean;
      startAt: number;
      endAt: number;
    },
  ): void;
}

export class DateBuilderParams {
  year: number = 0;
  month: number = 1;
  day: number = 1;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  millisecond: number = 0;
  isAfterNoon: boolean = false;
}

/**
 * DateTime class
 */
export class DateTime {
  /**
   * Converts the value of the given Date object to its equivalent string representation using the specified format.
   *
   * @param date: Date
   * @param format: string
   * @returns {string}
   */
  static format(date: Date, format: string): string {
    let result: string = '';

    this.traverseFormat(format, traverseParams => {
      result += traverseParams.isSpecifier
        ? FormatSpecifiers.get(traverseParams.code).toValueFn(date)
        : traverseParams.code;
    });

    return result;
  }

  /**
   * Converts the specified string representation of a date and time to its Date equivalent using the specified format.
   *
   * @param datetime: string
   * @param format: string
   * @returns {Date}
   */
  static parseExact(datetime: string, format: string): Date {
    const dateBuilderParams: DateBuilderParams = new DateBuilderParams();
    let formatSpecifier: FormatSpecifier;
    let specifierTimeValue: string;

    DateTime.traverseFormat(format, traverseParams => {
      if (traverseParams.isSpecifier) {
        formatSpecifier = FormatSpecifiers.get(traverseParams.code);

        if (formatSpecifier.hasReverseAbility) {
          specifierTimeValue = datetime.substring(traverseParams.startAt, traverseParams.endAt);
          assign(dateBuilderParams, formatSpecifier.toDateFn(specifierTimeValue));
        }
      }
    });

    return DateTime.buildDate(dateBuilderParams);
  }

  /**
   * Returns a new TimeSpan object based on date and time subtraction between given Date objects.
   *
   * @param date1: Date
   * @param date2: Date
   * @returns {TimeSpan}
   */
  static subtract(date1: Date, date2: Date = new Date()): TimeSpan {
    return new TimeSpan(date1.getTime() - date2.getTime());
  }

  /**
   * Returns a new TimeSpan object based on date subtraction between given Date objects.
   *
   * @param date1: Date
   * @param date2: Date
   * @returns {TimeSpan}
   */
  static subtractDate(date1: Date, date2: Date = new Date()): TimeSpan {
    const date1Milliseconds: number =
      date1.getTime() -
      date1.getHours() * msInTimeUnits.hour -
      date1.getMinutes() * msInTimeUnits.minute -
      date1.getSeconds() * msInTimeUnits.second -
      date1.getMilliseconds();
    const date2Milliseconds: number =
      date2.getTime() -
      date2.getHours() * msInTimeUnits.hour -
      date2.getMinutes() * msInTimeUnits.minute -
      date2.getSeconds() * msInTimeUnits.second -
      date2.getMilliseconds();

    return new TimeSpan(date1Milliseconds - date2Milliseconds);
  }

  /**
   * Returns a new Date object based od DateBuilderParams object.
   *
   * @param params: DateBuilderParams
   * @returns {Date}
   */
  private static buildDate(params: DateBuilderParams): Date {
    const allParams: DateBuilderParams = assign(new DateBuilderParams(), params);

    if (allParams.isAfterNoon) {
      allParams.hour += allParams.hour < 12 ? 12 : 0;
    }

    return new Date(
      allParams.year,
      allParams.month - 1,
      allParams.day,
      allParams.hour,
      allParams.minute,
      allParams.second,
      allParams.millisecond,
    );
  }

  /**
   * Traverse given date format and trigger callback function for every format specifier from FormatSpecifiers or for
   * single, unfamiliar letter.
   *
   * @param format: string
   * @param callback: IFormatTraverseCallback
   */
  private static traverseFormat(format: string, callback: IFormatTraverseCallback): void {
    let currentSpecifier: string;
    let nextLetter: string;
    let buffer: string = '';

    for (let i: number = 0; i < format.length; i++) {
      currentSpecifier = buffer + format[i];
      nextLetter = format[i + 1];

      if (nextLetter && FormatSpecifiers.has(currentSpecifier + nextLetter)) {
        buffer += format[i];
        continue;
      }

      callback({
        code: currentSpecifier,
        isSpecifier: FormatSpecifiers.has(currentSpecifier),
        startAt: i - currentSpecifier.length + 1,
        endAt: i + currentSpecifier.length,
      });
      buffer = '';
    }
  }
}
