import { TimeSpan } from '../src';
import { relativeFloor } from '../src/utils';

describe('TimeSpan', () => {
  const timeStamp1: TimeSpan = new TimeSpan(160, 12, 30, 45, 300);
  const timeStamp2: TimeSpan = new TimeSpan(-160, -12, -30, -45, -300);
  const timeStamp3: TimeSpan = new TimeSpan(1000000000000000);
  const timeStamp4: TimeSpan = new TimeSpan(-1000000000000000);

  describe('constructor', () => {
    it('should be able to construct from milliseconds', () => {
      let timeSpan: TimeSpan;
      expect(() => (timeSpan = new TimeSpan(1000))).not.toThrow();
      expect(timeSpan['_totalMilliseconds']).toBe(1000);
    });
    it('should be able to construct from hours, minutes and seconds', () => {
      let timeSpan: TimeSpan;
      expect(() => (timeSpan = new TimeSpan(12, 30, 45))).not.toThrow();
      expect(timeSpan['_totalMilliseconds']).toBe(45045000);
    });
    it('should be able to construct from days, hours, minutes and seconds', () => {
      let timeSpan: TimeSpan;
      expect(() => (timeSpan = new TimeSpan(7, 12, 30, 45))).not.toThrow();
      expect(timeSpan['_totalMilliseconds']).toBe(649845000);
    });
    it('should be able to construct from days, hours, minutes, seconds and milliseconds', () => {
      let timeSpan: TimeSpan;
      expect(() => (timeSpan = new TimeSpan(7, 12, 30, 45, 333))).not.toThrow();
      expect(timeSpan['_totalMilliseconds']).toBe(649845333);
    });
  });

  describe('days', () => {
    it('should return TimeSpan value in days', () => {
      expect(new TimeSpan(0).days).toBe(0);
      expect(timeStamp1.days).toBe(160);
      expect(timeStamp2.days).toBe(-160);
    });
  });

  describe('hours', () => {
    it('should return TimeSpan value in hours', () => {
      expect(new TimeSpan(0).hours).toBe(0);
      expect(timeStamp1.hours).toBe(12);
      expect(timeStamp2.hours).toBe(-12);
    });
  });

  describe('minutes', () => {
    it('should return TimeSpan value in minutes', () => {
      expect(new TimeSpan(0).minutes).toBe(0);
      expect(timeStamp1.minutes).toBe(30);
      expect(timeStamp2.minutes).toBe(-30);
    });
  });

  describe('seconds', () => {
    it('should return TimeSpan value in seconds', () => {
      expect(new TimeSpan(0).seconds).toBe(0);
      expect(timeStamp1.seconds).toBe(45);
      expect(timeStamp2.seconds).toBe(-45);
    });
  });

  describe('milliseconds', () => {
    it('should return TimeSpan value in milliseconds', () => {
      expect(new TimeSpan(0).milliseconds).toBe(0);
      expect(timeStamp1.milliseconds).toBe(300);
      expect(timeStamp2.milliseconds).toBe(-300);
    });
  });

  describe('totalDays', () => {
    it('should return TimeSpan value in days', () => {
      expect(new TimeSpan(0).totalDays).toBe(0);
      expect(relativeFloor(timeStamp3.totalDays * 1000) / 1000).toBe(11574074.074);
      expect(relativeFloor(timeStamp4.totalDays * 1000) / 1000).toBe(-11574074.074);
    });
  });

  describe('totalHours', () => {
    it('should return TimeSpan value in hours', () => {
      expect(new TimeSpan(0).totalHours).toBe(0);
      expect(relativeFloor(timeStamp3.totalHours * 1000) / 1000).toBe(277777777.777);
      expect(relativeFloor(timeStamp4.totalHours * 1000) / 1000).toBe(-277777777.777);
    });
  });

  describe('totalMinutes', () => {
    it('should return TimeSpan value in minutes', () => {
      expect(new TimeSpan(0).totalMinutes).toBe(0);
      expect(relativeFloor(timeStamp3.totalMinutes * 1000) / 1000).toBe(16666666666.666);
      expect(relativeFloor(timeStamp4.totalMinutes * 1000) / 1000).toBe(-16666666666.666);
    });
  });

  describe('totalSeconds', () => {
    it('should return TimeSpan value in seconds', () => {
      expect(new TimeSpan(0).totalSeconds).toBe(0);
      expect(timeStamp3.totalSeconds).toBe(1000000000000);
      expect(timeStamp4.totalSeconds).toBe(-1000000000000);
    });
  });

  describe('totalMilliseconds', () => {
    it('should return TimeSpan value in milliseconds', () => {
      expect(new TimeSpan(0).totalMilliseconds).toBe(0);
      expect(timeStamp3.totalMilliseconds).toBe(1000000000000000);
      expect(timeStamp4.totalMilliseconds).toBe(-1000000000000000);
    });
  });
});
