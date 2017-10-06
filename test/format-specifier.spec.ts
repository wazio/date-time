import { FormatSpecifier, IFormatSpecifierConstructorParams } from '../src/format-specifier';

describe('FormatSpecifier', () => {
  describe('createInstance', () => {
    it('should create new FormatSpecifier object with provided params as attributes', () => {
      const formatSpecifierConstructorParams: IFormatSpecifierConstructorParams = {
        code: 'yyyy',
        toValueFn: date => '',
        toDateName: 'year',
        toDateFn: value => ({ year: 1 }),
        length: 5,
      };
      const formatSpecifier: FormatSpecifier = FormatSpecifier.createInstance(formatSpecifierConstructorParams);

      expect(formatSpecifier.code).toBe(formatSpecifierConstructorParams.code);
      expect(formatSpecifier.toValueFn).toBe(formatSpecifierConstructorParams.toValueFn);
      expect(formatSpecifier.toDateName).toBe(formatSpecifierConstructorParams.toDateName);
      expect(formatSpecifier.toDateFn).toBe(formatSpecifierConstructorParams.toDateFn);
      expect(formatSpecifier.length).toBe(formatSpecifierConstructorParams.length);
    });
  });

  describe('hasReverseAbility', () => {
    it('should be true if toDateName or toDateFn was provided', () => {
      const formatSpecifier1: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toDateName: 'year',
        toValueFn: date => '',
      });
      const formatSpecifier2: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toDateFn: value => ({ year: value }),
        toValueFn: date => '',
      });
      const formatSpecifier3: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toValueFn: date => '',
      });

      expect(formatSpecifier1.hasReverseAbility).toBe(true);
      expect(formatSpecifier2.hasReverseAbility).toBe(true);
      expect(formatSpecifier3.hasReverseAbility).toBe(false);
    });
  });

  describe('length', () => {
    it('should be equal code length by default', () => {
      const formatSpecifier: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toDateName: 'year',
        toValueFn: date => '',
      });

      expect(formatSpecifier.length).toBe(5);
    });
    it('should be equal provided length param', () => {
      const formatSpecifier: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toDateName: 'year',
        toValueFn: date => '',
        length: 7,
      });

      expect(formatSpecifier.length).toBe(7);
    });
    it('should be undefined if specifier can not be used with Date generator', () => {
      const formatSpecifier: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyyy',
        toValueFn: date => '',
        length: 5,
      });

      expect(formatSpecifier.length).toBeUndefined();
    });
  });

  describe('toDateFn', () => {
    it('should return object with toDateName as property key and value as property value by default', () => {
      const formatSpecifier1: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'yyyy',
        toDateName: 'year',
        toValueFn: date => '',
      });
      const formatSpecifier2: FormatSpecifier = FormatSpecifier.createInstance({
        code: 'MM',
        toDateName: 'month',
        toValueFn: date => '',
      });

      expect(formatSpecifier1.toDateFn('2017')).toEqual({ year: 2017 });
      expect(formatSpecifier2.toDateFn('06')).toEqual({ month: 6 });
    });
  });
});
