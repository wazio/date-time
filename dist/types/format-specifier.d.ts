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
export declare class FormatSpecifier {
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
    private constructor();
    /**
     * Creates new instance of FormatSpecifier from given params.
     *
     * @param params
     * @returns {FormatSpecifier}
     */
    static createInstance(params: IFormatSpecifierConstructorParams): FormatSpecifier;
    /**
     * Returns value converted into DateBuilderParams.
     *
     * @param value: string
     * @returns {Partial<DateBuilderParams>}
     */
    toDateFn(value: string): Partial<DateBuilderParams>;
}
