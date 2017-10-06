import { DateBuilderParams } from './date-time';

export interface IFormatSpecifierConstructorParams {
  code: string;
  length?: number;
  toDateName?: keyof (DateBuilderParams);
  toDateFn?: IFormatSpecifierToDateFn;
  toValueFn: IFormatSpecifierToValueFn;
}

export interface IFormatSpecifierToValueFn {
  (date: Date): string;
}

export interface IFormatSpecifierToDateFn {
  (value: any): Partial<DateBuilderParams>;
}

/**
 * FormatSpecifier class
 */
export class FormatSpecifier {
  code: string;
  length: number;
  toDateName: keyof (DateBuilderParams);
  hasReverseAbility: boolean;

  /**
   * Returns string representation of Date object's value.
   *
   * @param date: Date
   * @returns {string}
   */
  toValueFn: (date: Date) => string;

  /**
   * Objects created by createInstance static method.
   */
  private constructor() {}

  /**
   * Creates new instance of FormatSpecifier from given params.
   *
   * @param params
   * @returns {FormatSpecifier}
   */
  static createInstance(params: IFormatSpecifierConstructorParams): FormatSpecifier {
    const hasReverseAbility: boolean = !!(params.toDateName || params.toDateFn);

    return Object.assign(new FormatSpecifier(), params, {
      hasReverseAbility,
      length: hasReverseAbility ? params.length || params.code.length : undefined,
    });
  }

  /**
   * Returns value converted into DateBuilderParams.
   *
   * @param value: string
   * @returns {Partial<DateBuilderParams>}
   */
  toDateFn(value: string): Partial<DateBuilderParams> {
    const params: Partial<DateBuilderParams> = {};
    params[this.toDateName] = parseInt(value, 10);

    return params;
  }
}
