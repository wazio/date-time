import { addZeroPrefix, relativeFloor } from '../src/utils';

describe('Utils', () => {
  describe('addZeroPrefix', () => {
    it('should add zeros to beginning of the value to return expected length string', () => {
      expect(addZeroPrefix(1, 2)).toBe('01');
      expect(addZeroPrefix('1', 2)).toBe('01');
      expect(addZeroPrefix(123, 6)).toBe('000123');
      expect(addZeroPrefix('123', 6)).toBe('000123');
      expect(addZeroPrefix(0.1, 4)).toBe('00.1');
      expect(addZeroPrefix('.1', 4)).toBe('00.1');
      expect(addZeroPrefix(1.5, 4)).toBe('01.5');
      expect(addZeroPrefix('1.5', 4)).toBe('01.5');
    });
  });

  describe('relativeFloor', () => {
    it('should return largest integer less than or equal to a given positive number', () => {
      expect(relativeFloor(0.5)).toBe(0);
      expect(relativeFloor(2.5)).toBe(2);
      expect(relativeFloor(123.123)).toBe(123);
    });
    it('should return largest integer grater than or equal to a given negative number', () => {
      expect(relativeFloor(-0.5)).toBe(-0);
      expect(relativeFloor(-2.5)).toBe(-2);
      expect(relativeFloor(-123.123)).toBe(-123);
    });
  });
});
