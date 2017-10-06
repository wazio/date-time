import { FormatSpecifier } from './format-specifier';
import { addZeroPrefix } from './utils';

export interface IFormatSpecifiersList {
  [key: string]: FormatSpecifier;
}

/**
 * FormatSpecifiers class
 */
export class FormatSpecifiers {
  /**
   * A list of all available specifiers.
   *
   * @type {IFormatSpecifiersList}
   */
  private static specifiers: IFormatSpecifiersList = {
    /// Year
    y: FormatSpecifier.createInstance({
      code: 'y',
      toDateName: 'year',
      toValueFn: date => (date.getFullYear() % 10).toString(),
    }),
    yy: FormatSpecifier.createInstance({
      code: 'yy',
      toDateName: 'year',
      toValueFn: date => addZeroPrefix(date.getFullYear() % 100, 2),
    }),
    yyy: FormatSpecifier.createInstance({
      code: 'yyy',
      toDateName: 'year',
      toValueFn: date => addZeroPrefix(date.getFullYear() % 1000, 3),
    }),
    yyyy: FormatSpecifier.createInstance({
      code: 'yyyy',
      toDateName: 'year',
      toValueFn: date => addZeroPrefix(date.getFullYear(), 4),
    }),
    yyyyy: FormatSpecifier.createInstance({
      code: 'yyyyy',
      toDateName: 'year',
      toValueFn: date => addZeroPrefix(date.getFullYear(), 5),
    }),

    /// Month
    M: FormatSpecifier.createInstance({
      code: 'M',
      toValueFn: date => (date.getMonth() + 1).toString(),
    }),
    MM: FormatSpecifier.createInstance({
      code: 'MM',
      toDateName: 'month',
      toValueFn: date => addZeroPrefix(date.getMonth() + 1, 2),
    }),

    /// Day
    d: FormatSpecifier.createInstance({
      code: 'd',
      toValueFn: date => date.getDate().toString(),
    }),
    dd: FormatSpecifier.createInstance({
      code: 'dd',
      toDateName: 'day',
      toValueFn: date => addZeroPrefix(date.getDate(), 2),
    }),

    /// Hour
    h: FormatSpecifier.createInstance({
      code: 'h',
      toValueFn: date => (date.getHours() % 12 || 12).toString(),
    }),
    hh: FormatSpecifier.createInstance({
      code: 'hh',
      toDateName: 'hour',
      toValueFn: date => addZeroPrefix(date.getHours() % 12 || 12, 2),
    }),
    H: FormatSpecifier.createInstance({
      code: 'H',
      toValueFn: date => date.getHours().toString(),
    }),
    HH: FormatSpecifier.createInstance({
      code: 'HH',
      toDateName: 'hour',
      toValueFn: date => addZeroPrefix(date.getHours(), 2),
    }),
    t: FormatSpecifier.createInstance({
      code: 't',
      toDateFn: (value: string) => ({ isAfterNoon: value === 'P' }),
      toValueFn: date => (date.getHours() === 0 || date.getHours() < 12 ? 'A' : 'P'),
    }),
    tt: FormatSpecifier.createInstance({
      code: 'tt',
      toDateFn: (value: string) => ({ isAfterNoon: value === 'PM' }),
      toValueFn: date => (date.getHours() === 0 || date.getHours() < 12 ? 'AM' : 'PM'),
    }),

    /// Minute
    m: FormatSpecifier.createInstance({
      code: 'm',
      toValueFn: date => date.getMinutes().toString(),
    }),
    mm: FormatSpecifier.createInstance({
      code: 'mm',
      toDateName: 'minute',
      toValueFn: date => addZeroPrefix(date.getMinutes(), 2),
    }),

    /// Second
    s: FormatSpecifier.createInstance({
      code: 's',
      toValueFn: date => date.getSeconds().toString(),
    }),
    ss: FormatSpecifier.createInstance({
      code: 'ss',
      toDateName: 'second',
      toValueFn: date => addZeroPrefix(date.getSeconds(), 2),
    }),

    /// Millisecond
    f: FormatSpecifier.createInstance({
      code: 'f',
      toDateFn: (value: string) => ({ millisecond: parseInt(value, 10) * 100 }),
      toValueFn: date => Math.floor(date.getMilliseconds() / 100).toString(),
    }),
    ff: FormatSpecifier.createInstance({
      code: 'ff',
      toDateFn: (value: string) => ({ millisecond: parseInt(value, 10) * 10 }),
      toValueFn: date => addZeroPrefix(Math.floor(date.getMilliseconds() / 10), 2),
    }),
    fff: FormatSpecifier.createInstance({
      code: 'fff',
      toDateName: 'millisecond',
      toValueFn: date => addZeroPrefix(date.getMilliseconds(), 3),
    }),
  };

  /**
   * Checks if there is a specifier with given code.
   *
   * @param code: string
   * @returns {boolean}
   */
  static has(code: string): boolean {
    return FormatSpecifiers.specifiers.hasOwnProperty(code);
  }

  /**
   * Returns FormatSpecifier with given code.
   *
   * @param code: string
   * @returns {FormatSpecifier}
   */
  static get(code: string): FormatSpecifier {
    return FormatSpecifiers.specifiers[code];
  }

  /**
   * Returns all FormatSpecifiers.
   *
   * @returns {IFormatSpecifiersList}
   */
  static getAll(): IFormatSpecifiersList {
    return FormatSpecifiers.specifiers;
  }
}
