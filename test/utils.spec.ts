import { addZeroPrefix, assign, relativeFloor, sign } from '../src/utils';

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

  describe('assign', () => {
    it('should copy values from source objects to target', () => {
      const value: any = {};
      const value2: any = {};
      const objectWithValue: any = { value };
      const objectWithValue2: any = { value2 };
      const objectWithCopiedValue: any = {};

      assign(objectWithCopiedValue, objectWithValue, objectWithValue2);
      const objectWithCopiedValueReturned: any = assign(objectWithCopiedValue, objectWithValue, objectWithValue2);

      expect(objectWithCopiedValue.value).toBe(value);
      expect(objectWithCopiedValue.value2).toBe(value2);
      expect(objectWithCopiedValueReturned.value).toBe(value);
      expect(objectWithCopiedValueReturned.value2).toBe(value2);
    });
  });

  describe('sign', () => {
    it('should return 1 for positive values', () => {
      expect(sign(0.1)).toBe(1);
      expect(sign(1)).toBe(1);
      expect(sign(100)).toBe(1);
    });
    it('should return 0 for zero value', () => {
      expect(sign(0)).toBe(0);
    });
    it('should return 1 for negative values', () => {
      expect(sign(-0.1)).toBe(-1);
      expect(sign(-1)).toBe(-1);
      expect(sign(-100)).toBe(-1);
    });
  });
});
