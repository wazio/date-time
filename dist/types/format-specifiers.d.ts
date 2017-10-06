import { FormatSpecifier } from './format-specifier';
export interface IFormatSpecifiersList {
    [key: string]: FormatSpecifier;
}
/**
 * FormatSpecifiers class
 */
export declare class FormatSpecifiers {
    /**
     * A list of all available specifiers.
     *
     * @type {IFormatSpecifiersList}
     */
    private static specifiers;
    /**
     * Checks if there is a specifier with given code.
     *
     * @param code: string
     * @returns {boolean}
     */
    static has(code: string): boolean;
    /**
     * Returns FormatSpecifier with given code.
     *
     * @param code: string
     * @returns {FormatSpecifier}
     */
    static get(code: string): FormatSpecifier;
    /**
     * Returns all FormatSpecifiers.
     *
     * @returns {IFormatSpecifiersList}
     */
    static getAll(): IFormatSpecifiersList;
}
