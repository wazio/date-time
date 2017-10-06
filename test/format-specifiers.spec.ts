import { FormatSpecifiers } from '../src/format-specifiers';

describe('FormatSpecifiers', () => {
  const date1: Date = new Date(2000, 0, 8, 0, 0, 0, 0);
  const date2: Date = new Date(2007, 5, 17, 12, 4, 9, 813);
  const date3: Date = new Date(2022, 11, 30, 21, 39, 58, 500);
  const dates: Date[] = [date1, date2, date3];
  const formatSpecifiers = FormatSpecifiers.getAll();
  const triggerToValueFn = (name, value) => FormatSpecifiers.get(name).toValueFn(value);
  const triggerToDateFn = (name, value) => FormatSpecifiers.get(name).toDateFn(value);

  describe('specifiers', () => {
    /// Year
    describe('y', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('y', date1)).toBe('0');
        expect(triggerToValueFn('y', date2)).toBe('7');
        expect(triggerToValueFn('y', date3)).toBe('2');

        expect(triggerToDateFn('y', '0')).toEqual({ year: 0 });
        expect(triggerToDateFn('y', '7')).toEqual({ year: 7 });
        expect(triggerToDateFn('y', '2')).toEqual({ year: 2 });
      });
    });
    describe('yy', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('yy', date1)).toBe('00');
        expect(triggerToValueFn('yy', date2)).toBe('07');
        expect(triggerToValueFn('yy', date3)).toBe('22');
      });
    });
    describe('yyy', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('yyy', date1)).toBe('000');
        expect(triggerToValueFn('yyy', date2)).toBe('007');
        expect(triggerToValueFn('yyy', date3)).toBe('022');
      });
    });
    describe('yyyy', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('yyyy', date1)).toBe('2000');
        expect(triggerToValueFn('yyyy', date2)).toBe('2007');
        expect(triggerToValueFn('yyyy', date3)).toBe('2022');
      });
    });
    describe('yyyyy', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('yyyyy', date1)).toBe('02000');
        expect(triggerToValueFn('yyyyy', date2)).toBe('02007');
        expect(triggerToValueFn('yyyyy', date3)).toBe('02022');
      });
    });

    /// Month
    describe('M', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('M', date1)).toBe('1');
        expect(triggerToValueFn('M', date2)).toBe('6');
        expect(triggerToValueFn('M', date3)).toBe('12');
      });
    });
    describe('MM', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('MM', date1)).toBe('01');
        expect(triggerToValueFn('MM', date2)).toBe('06');
        expect(triggerToValueFn('MM', date3)).toBe('12');
      });
    });

    /// Day
    describe('d', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('d', date1)).toBe('8');
        expect(triggerToValueFn('d', date2)).toBe('17');
        expect(triggerToValueFn('d', date3)).toBe('30');
      });
    });
    describe('dd', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('dd', date1)).toBe('08');
        expect(triggerToValueFn('dd', date2)).toBe('17');
        expect(triggerToValueFn('dd', date3)).toBe('30');
      });
    });

    /// Hour
    describe('h', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('h', date1)).toBe('12');
        expect(triggerToValueFn('h', date2)).toBe('12');
        expect(triggerToValueFn('h', date3)).toBe('9');
      });
    });
    describe('hh', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('hh', date1)).toBe('12');
        expect(triggerToValueFn('hh', date2)).toBe('12');
        expect(triggerToValueFn('hh', date3)).toBe('09');
      });
    });
    describe('H', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('H', date1)).toBe('0');
        expect(triggerToValueFn('H', date2)).toBe('12');
        expect(triggerToValueFn('H', date3)).toBe('21');
      });
    });
    describe('HH', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('HH', date1)).toBe('00');
        expect(triggerToValueFn('HH', date2)).toBe('12');
        expect(triggerToValueFn('HH', date3)).toBe('21');
      });
    });
    describe('t', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('t', date1)).toBe('A');
        expect(triggerToValueFn('t', date2)).toBe('P');
        expect(triggerToValueFn('t', date3)).toBe('P');
      });
    });
    describe('tt', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('tt', date1)).toBe('AM');
        expect(triggerToValueFn('tt', date2)).toBe('PM');
        expect(triggerToValueFn('tt', date3)).toBe('PM');
      });
    });

    /// Minute
    describe('m', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('m', date1)).toBe('0');
        expect(triggerToValueFn('m', date2)).toBe('4');
        expect(triggerToValueFn('m', date3)).toBe('39');
      });
    });
    describe('mm', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('mm', date1)).toBe('00');
        expect(triggerToValueFn('mm', date2)).toBe('04');
        expect(triggerToValueFn('mm', date3)).toBe('39');
      });
    });

    /// Second
    describe('s', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('s', date1)).toBe('0');
        expect(triggerToValueFn('s', date2)).toBe('9');
        expect(triggerToValueFn('s', date3)).toBe('58');
      });
    });
    describe('ss', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('ss', date1)).toBe('00');
        expect(triggerToValueFn('ss', date2)).toBe('09');
        expect(triggerToValueFn('ss', date3)).toBe('58');
      });
    });

    /// Millisecond
    describe('f', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('f', date1)).toBe('0');
        expect(triggerToValueFn('f', date2)).toBe('8');
        expect(triggerToValueFn('f', date3)).toBe('5');

        expect(triggerToDateFn('f', '0')).toEqual({ millisecond: 0 });
        expect(triggerToDateFn('f', '8')).toEqual({ millisecond: 800 });
        expect(triggerToDateFn('f', '5')).toEqual({ millisecond: 500 });
      });
    });
    describe('ff', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('ff', date1)).toBe('00');
        expect(triggerToValueFn('ff', date2)).toBe('81');
        expect(triggerToValueFn('ff', date3)).toBe('50');

        expect(triggerToDateFn('ff', '00')).toEqual({ millisecond: 0 });
        expect(triggerToDateFn('ff', '81')).toEqual({ millisecond: 810 });
        expect(triggerToDateFn('ff', '50')).toEqual({ millisecond: 500 });
      });
    });
    describe('fff', () => {
      it('should return correct values', () => {
        expect(triggerToValueFn('fff', date1)).toBe('000');
        expect(triggerToValueFn('fff', date2)).toBe('813');
        expect(triggerToValueFn('fff', date3)).toBe('500');
      });
    });

    // All
    describe('length', () => {
      it('should be equal to value length returned by toValueFn for every date', () => {
        let countOfMatchedValueLength: number;

        Object.keys(formatSpecifiers).forEach(key => {
          if (formatSpecifiers[key].length !== undefined) {
            countOfMatchedValueLength = 0;

            dates.forEach(date => {
              expect(triggerToValueFn(key, date).length).toBe(
                formatSpecifiers[key].length,
                'value length is not matching expected specifier length',
              );

              if (triggerToValueFn(key, date).length === formatSpecifiers[key].length) {
                countOfMatchedValueLength++;
              }
            });

            expect(countOfMatchedValueLength).toBe(
              dates.length,
              `value length returned by ${key} is not the same for every date`,
            );
          }
        });
      });
    });
  });
});
