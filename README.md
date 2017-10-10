[![Build Status](https://travis-ci.org/wazio/date-time.svg?branch=master)](https://travis-ci.org/wazio/date-time)
[![Coverage Status](https://coveralls.io/repos/github/wazio/date-time/badge.svg?branch=master)](https://coveralls.io/github/wazio/date-time?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# DateTime
A small JavaScript library written in TypeScript with some useful methods that I've always missed in JavaScript's Date object.
**Written without Regex.** Based on C# DateTime class.

### Installation
```typescript
npm install @wazio/date-time
```

### Test
```typescript
npm test
```

### Usage
```typescript
import { DateTime, TimeSpan } from '@wazio/date-time';

// format
DateTime.format(new Date(2017, 5, 12, 16, 30), 'yyyy-MM-dd hh:mm tt'); // will output '2017-06-12 04:30 PM'

// parseExact
DateTime.parseExact('2017-06-12 04:30 PM', 'yyyy-MM-dd hh:mm tt'); // will be equal to new Date(2017, 5, 12, 16, 30)

// subtract
let timeSpan: TimeSpan = DateTime.subtract(new Date(2017, 5, 12, 16, 30), new Date(2017, 5, 11, 13, 30));
timeSpan.days; // will output 1
timeSpan.hours; // will output 3
timeSpan.totalDays; // will output 1.125
timeSpan.totalHours; // will output 27

// subtractDate
let timeSpan: TimeSpan = DateTime.subtractDate(new Date(2017, 5, 12, 16, 30), new Date(2017, 5, 11, 13, 30));
timeSpan.days; // will output 1
timeSpan.hours; // will output 0
timeSpan.totalDays; // will output 1
timeSpan.totalHours; // will output 24

// day checking with subtractDate
let timeSpan: TimeSpan = DateTime.subtractDate(new Date(2017, 5, 12, 16, 30), new Date(2017, 5, 13, 13, 30)); // second parameter is current date by default
let isYesterday: boolean = timeSpan.days === -1; // will output true
let isToday: boolean = timeSpan.days === 0; // will output false
let isTomorrow: boolean = timeSpan.days === 1; // will output false
```

### Classes
#### DateTime
##### Methods
| Name | Description |
| --- | ---|
| `static format(date: Date, format: string): string` | Converts the value of the given Date object to its equivalent string representation using the specified format. |
| `static parseExact(datetime: string, format: string): Date` | Converts the specified string representation of a date and time to its Date equivalent using the specified format. |
| `static subtract(date1: Date, date2: Date = new Date()): TimeSpan` | Returns a new TimeSpan object based on date and time subtraction between given Date objects. |
| `static subtractDate(date1: Date, date2: Date = new Date()): TimeSpan` | Returns a new TimeSpan object based on date subtraction between given Date objects. |

#### TimeSpan
##### Constructor
```typescript
constructor(milliseconds: number);
constructor(hours: number, minutes: number, seconds: number);
constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds?: number);
```
##### Methods
| Name | Description |
| --- | ---|
| `get days(): number` | Returns the days component of the time interval represented by the current TimeSpan structure. |
| `get hours(): number` | Returns the hours component of the time interval represented by the current TimeSpan structure. |
| `get minutes(): number` | Returns the minutes component of the time interval represented by the current TimeSpan structure. |
| `get seconds(): number` | Returns the seconds component of the time interval represented by the current TimeSpan structure. |
| `get milliseconds(): number` | Returns the milliseconds component of the time interval represented by the current TimeSpan structure. |
| | |
| `get totalDays(): number` | Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional days. |
| `get totalHours(): number` | Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional hours. |
| `get totalMinutes(): number` | Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional minutes. |
| `get totalSeconds(): number` | Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional seconds. |
| `get totalMilliseconds(): number` | Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional milliseconds. |

#### Format Specifiers
| Format specifier | Description | Example | Compatible with parseExact |
| --- | --- | --- | --- |
| **Year**
| y     | The year, from 0 to 99. | 7 | yes |
| yy    | The year, from 00 to 99. | 17 | yes |
| yyy   | The year, with a minimum of three digits. | 017 | yes |
| yyyy  | The year as a four-digit number. | 2017 | yes |
| yyyyy | The year as a five-digit number. | 02017  | yes |
||
| **Month**
| M     | The month, from 1 through 12. | 6 | - |
| MM    | The month, from 01 through 12. | 06 | yes |
||
| **Day**
| d     | The day of the month, from 1 through 31. | 8 | - |
| dd    | The day of the month, from 01 through 31. | 08 | yes |
||
| **Hour**
| h     | The hour, using a 12-hour clock from 1 to 12. | 6 | - |
| hh    | The hour, using a 12-hour clock from 01 to 12. | 06 | yes |
| H     | The hour, using a 24-hour clock from 0 to 23. | 6 | - |
| HH    | The hour, using a 24-hour clock from 00 to 23. | 06 | yes |
| t     | The first character of the AM/PM designator. | P | yes |
| tt    | The AM/PM designator. | PM | yes |
||
| **Minute**
| m     | The minute, from 0 through 59. | 4 | - |
| mm    | The minute, from 00 through 59. | 04 | yes |
||
| **Second**
| s     | The second, from 0 through 59. | 9 | - |
| ss    | The second, from 00 through 59. | 09 | yes |
||
| **Millisecond**
| f     | The tenths of a second in a date and time value. | 8 | yes |
| ff    | The hundredths of a second in a date and time value. | 81 | yes |
| fff   | The milliseconds in a date and time value. | 813 | yes |
