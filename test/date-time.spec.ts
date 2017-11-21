import { DateTime } from '../src';
import { TimeSpan } from '../src/time-span';

describe('DateTime', () => {
  const date1: Date = new Date(2000, 0, 8, 0, 0, 0, 0);
  const date2: Date = new Date(2007, 5, 17, 12, 4, 9, 813);
  const date3: Date = new Date(2022, 11, 30, 21, 39, 58, 500);
  const now: Date = new Date(2017, 7, 12, 15);
  const todayBeforeNowHour: Date = new Date(2017, 7, 12, 14);
  const todayAfterNowHour: Date = new Date(2017, 7, 12, 16);
  const yesterdayBeforeNowHour: Date = new Date(2017, 7, 11, 14);
  const yesterdayAfterNowHour: Date = new Date(2017, 7, 11, 16);
  const tomorrowBeforeNowHour: Date = new Date(2017, 7, 13, 14);
  const tomorrowAfterNowHour: Date = new Date(2017, 7, 13, 16);

  describe('format', () => {
    it('should correctly format years', () => {
      expect(DateTime.format(date1, 'yyyy-MM-dd HH:mm:ss:fff')).toBe('2000-01-08 00:00:00:000');
      expect(DateTime.format(date2, 'yyyy-MM-dd HH:mm:ss:fff')).toBe('2007-06-17 12:04:09:813');
      expect(DateTime.format(date3, 'yyyy-MM-dd HH:mm:ss:fff')).toBe('2022-12-30 21:39:58:500');

      expect(DateTime.format(date1, 'yy-M-d h:m:s:f tt')).toBe('00-1-8 12:0:0:0 AM');
      expect(DateTime.format(date2, 'yy-M-d h:m:s:f tt')).toBe('07-6-17 12:4:9:8 PM');
      expect(DateTime.format(date3, 'yy-M-d h:m:s:f tt')).toBe('22-12-30 9:39:58:5 PM');

      expect(DateTime.format(date1, 'yyy. hh:m:s:ff t')).toBe('000. 12:0:0:00 A');
      expect(DateTime.format(date2, 'yyy. hh:m:s:ff t')).toBe('007. 12:4:9:81 P');
      expect(DateTime.format(date3, 'yyy. hh:m:s:ff t')).toBe('022. 09:39:58:50 P');
    });
  });

  describe('parseExact', () => {
    it('should create correct Date object', () => {
      const values = [
        ['2000', 'yyyy'],
        ['06', 'MM'],
        ['17', 'dd'],
        ['2000 06', 'yyyy MM'],
        ['2000 06 17', 'yyyy MM dd'],
        ['04:33:14 AM', 'hh:mm:ss tt'],
        ['04:33:14 PM', 'hh:mm:ss tt'],
        ['2000-01-08 00:00:00:000', 'yyyy-MM-dd HH:mm:ss:fff'],
        ['2007-06-17 12:04:09:813 P', 'yyyy-MM-dd hh:mm:ss:fff t'],
        ['2022-12-30 21:39:58:500', 'yyyy-MM-dd HH:mm:ss:fff'],
      ];

      values.forEach(value => {
        expect(DateTime.format(DateTime.parseExact(value[0], value[1]), value[1])).toBe(value[0]);
      });

      // ensure that it works when format and parseExact formats are different
      expect(
        DateTime.format(
          DateTime.parseExact('2022-09-07 21:03:04:500', 'yyyy-MM-dd HH:mm:ss:fff'),
          't tt ff,s,m,h d/M/yy',
        ),
      ).toBe('P PM 50,4,3,9 7/9/22');
    });
    it('should skip specifiers with no reverse ability', () => {
      const date: Date = DateTime.parseExact('7:03:04:500', 'H:mm:ss:fff');
      expect(DateTime.format(date, 'H:mm:ss:fff')).toBe('0:03:04:500');
    });
  });

  describe('subtract', () => {
    it('should create TimeSpan object', () => {
      expect(DateTime.subtract(new Date(), new Date()) instanceof TimeSpan).toBeTruthy();
    });
    it('should include date value from Date object', () => {
      expect(DateTime.subtract(new Date(2017, 0, 2, 12), new Date(2017, 0, 1, 12)).totalDays).not.toBe(0);
    });
    it('should include time value from Date object', () => {
      expect(DateTime.subtract(new Date(2017, 0, 1, 12), new Date(2017, 0, 1, 13)).totalDays).not.toBe(0);
    });
    it('should return TimeSpan object with correct date difference', () => {
      expect(DateTime.subtract(new Date(10000), new Date(3000)).totalMilliseconds).toBe(7000);
      expect(DateTime.subtract(new Date(2013, 0, 1), new Date(2012, 0, 1)).days).toBe(366);

      expect(DateTime.subtract(todayBeforeNowHour, now).totalDays).not.toBe(0);
      expect(DateTime.subtract(todayAfterNowHour, now).totalDays).not.toBe(0);
      expect(DateTime.subtract(yesterdayBeforeNowHour, now).days).toBe(-1);
      expect(DateTime.subtract(yesterdayAfterNowHour, now).days).toBe(0);
      expect(DateTime.subtract(tomorrowBeforeNowHour, now).days).toBe(0);
      expect(DateTime.subtract(tomorrowAfterNowHour, now).days).toBe(1);
    });
    it('should have second date equal now by default', () => {
      expect(DateTime.subtract(new Date()).totalSeconds).toBe(0);
    });
  });

  describe('subtractDate', () => {
    it('should create TimeSpan object', () => {
      expect(DateTime.subtractDate(new Date(), new Date()) instanceof TimeSpan).toBeTruthy();
    });
    it('should include date value from Date object', () => {
      expect(DateTime.subtractDate(new Date(2017, 0, 2, 12), new Date(2017, 0, 1, 12)).totalDays).not.toBe(0);
    });
    it('should ignore time value from Date object', () => {
      expect(DateTime.subtractDate(new Date(2017, 0, 1, 12), new Date(2017, 0, 1, 13)).totalDays).toBe(0);
    });
    it('should return TimeSpan object with correct full days difference between given date and now', () => {
      expect(DateTime.subtractDate(todayBeforeNowHour, now).totalDays).toBe(0);
      expect(DateTime.subtractDate(todayAfterNowHour, now).totalDays).toBe(0);
      expect(DateTime.subtractDate(yesterdayBeforeNowHour, now).days).toBe(-1);
      expect(DateTime.subtractDate(yesterdayAfterNowHour, now).days).toBe(-1);
      expect(DateTime.subtractDate(tomorrowBeforeNowHour, now).days).toBe(1);
      expect(DateTime.subtractDate(tomorrowAfterNowHour, now).days).toBe(1);
    });
    it('should have second date equal now by default', () => {
      expect(DateTime.subtractDate(new Date()).totalSeconds).toBe(0);
    });
  });
});
