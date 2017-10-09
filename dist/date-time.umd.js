(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wazio = global.wazio || {}, global.wazio.dateTime = {})));
}(this, (function (exports) { 'use strict';

/**
 * Milliseconds in time units object.
 */
var msInTimeUnits = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
};
/**
 * Returns string value with enough zeros at the beginning to match expectedLength param.
 *
 * @param value: number|string
 * @param expectedLength: number
 * @returns {string}
 */
function addZeroPrefix(value, expectedLength) {
    var stringValue = value.toString();
    var zeroCount = expectedLength - stringValue.length;
    while (zeroCount-- > 0)
        stringValue = '0' + stringValue;
    return stringValue;
}
/**
 * For positive number returns largest integer less than or equal to a given number and
 * for negative number returns largest integer grater than or equal to a given number
 *
 * @param value: number
 * @returns {number}
 */
function relativeFloor(value) {
    return sign(value) * Math.floor(Math.abs(value));
}
/**
 * Copy the values of all of the enumerable own properties from one or more source objects to a target object.
 * Returns the target object.
 * ES6 polyfill.
 *
 * @param target: object
 * @param sources: any[]
 * @returns {any}
 */
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
/**
 * Returns the sign of the x, indicating whether x is positive, negative or zero.
 * ES6 polyfill.
 *
 * @param x: number
 * @returns {number}
 */
function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

/**
 * FormatSpecifier class
 */
var FormatSpecifier = (function () {
    /**
     * Objects created by createInstance static method.
     */
    function FormatSpecifier() {
    }
    /**
     * Creates new instance of FormatSpecifier from given params.
     *
     * @param params
     * @returns {FormatSpecifier}
     */
    FormatSpecifier.createInstance = function (params) {
        var hasReverseAbility = !!(params.toDateName || params.toDateFn);
        return assign(new FormatSpecifier(), params, {
            hasReverseAbility: hasReverseAbility,
            length: hasReverseAbility ? params.length || params.code.length : undefined,
        });
    };
    /**
     * Returns value converted into DateBuilderParams.
     *
     * @param value: string
     * @returns {Partial<DateBuilderParams>}
     */
    FormatSpecifier.prototype.toDateFn = function (value) {
        var params = {};
        params[this.toDateName] = parseInt(value, 10);
        return params;
    };
    return FormatSpecifier;
}());

/**
 * FormatSpecifiers class
 */
var FormatSpecifiers = (function () {
    function FormatSpecifiers() {
    }
    /**
     * Checks if there is a specifier with given code.
     *
     * @param code: string
     * @returns {boolean}
     */
    FormatSpecifiers.has = function (code) {
        return FormatSpecifiers.specifiers.hasOwnProperty(code);
    };
    /**
     * Returns FormatSpecifier with given code.
     *
     * @param code: string
     * @returns {FormatSpecifier}
     */
    FormatSpecifiers.get = function (code) {
        return FormatSpecifiers.specifiers[code];
    };
    /**
     * Returns all FormatSpecifiers.
     *
     * @returns {IFormatSpecifiersList}
     */
    FormatSpecifiers.getAll = function () {
        return FormatSpecifiers.specifiers;
    };
    /**
     * A list of all available specifiers.
     *
     * @type {IFormatSpecifiersList}
     */
    FormatSpecifiers.specifiers = {
        /// Year
        y: FormatSpecifier.createInstance({
            code: 'y',
            toDateName: 'year',
            toValueFn: function (date) { return (date.getFullYear() % 10).toString(); },
        }),
        yy: FormatSpecifier.createInstance({
            code: 'yy',
            toDateName: 'year',
            toValueFn: function (date) { return addZeroPrefix(date.getFullYear() % 100, 2); },
        }),
        yyy: FormatSpecifier.createInstance({
            code: 'yyy',
            toDateName: 'year',
            toValueFn: function (date) { return addZeroPrefix(date.getFullYear() % 1000, 3); },
        }),
        yyyy: FormatSpecifier.createInstance({
            code: 'yyyy',
            toDateName: 'year',
            toValueFn: function (date) { return addZeroPrefix(date.getFullYear(), 4); },
        }),
        yyyyy: FormatSpecifier.createInstance({
            code: 'yyyyy',
            toDateName: 'year',
            toValueFn: function (date) { return addZeroPrefix(date.getFullYear(), 5); },
        }),
        /// Month
        M: FormatSpecifier.createInstance({
            code: 'M',
            toValueFn: function (date) { return (date.getMonth() + 1).toString(); },
        }),
        MM: FormatSpecifier.createInstance({
            code: 'MM',
            toDateName: 'month',
            toValueFn: function (date) { return addZeroPrefix(date.getMonth() + 1, 2); },
        }),
        /// Day
        d: FormatSpecifier.createInstance({
            code: 'd',
            toValueFn: function (date) { return date.getDate().toString(); },
        }),
        dd: FormatSpecifier.createInstance({
            code: 'dd',
            toDateName: 'day',
            toValueFn: function (date) { return addZeroPrefix(date.getDate(), 2); },
        }),
        /// Hour
        h: FormatSpecifier.createInstance({
            code: 'h',
            toValueFn: function (date) { return (date.getHours() % 12 || 12).toString(); },
        }),
        hh: FormatSpecifier.createInstance({
            code: 'hh',
            toDateName: 'hour',
            toValueFn: function (date) { return addZeroPrefix(date.getHours() % 12 || 12, 2); },
        }),
        H: FormatSpecifier.createInstance({
            code: 'H',
            toValueFn: function (date) { return date.getHours().toString(); },
        }),
        HH: FormatSpecifier.createInstance({
            code: 'HH',
            toDateName: 'hour',
            toValueFn: function (date) { return addZeroPrefix(date.getHours(), 2); },
        }),
        t: FormatSpecifier.createInstance({
            code: 't',
            toDateFn: function (value) { return ({ isAfterNoon: value === 'P' }); },
            toValueFn: function (date) { return (date.getHours() === 0 || date.getHours() < 12 ? 'A' : 'P'); },
        }),
        tt: FormatSpecifier.createInstance({
            code: 'tt',
            toDateFn: function (value) { return ({ isAfterNoon: value === 'PM' }); },
            toValueFn: function (date) { return (date.getHours() === 0 || date.getHours() < 12 ? 'AM' : 'PM'); },
        }),
        /// Minute
        m: FormatSpecifier.createInstance({
            code: 'm',
            toValueFn: function (date) { return date.getMinutes().toString(); },
        }),
        mm: FormatSpecifier.createInstance({
            code: 'mm',
            toDateName: 'minute',
            toValueFn: function (date) { return addZeroPrefix(date.getMinutes(), 2); },
        }),
        /// Second
        s: FormatSpecifier.createInstance({
            code: 's',
            toValueFn: function (date) { return date.getSeconds().toString(); },
        }),
        ss: FormatSpecifier.createInstance({
            code: 'ss',
            toDateName: 'second',
            toValueFn: function (date) { return addZeroPrefix(date.getSeconds(), 2); },
        }),
        /// Millisecond
        f: FormatSpecifier.createInstance({
            code: 'f',
            toDateFn: function (value) { return ({ millisecond: parseInt(value, 10) * 100 }); },
            toValueFn: function (date) { return Math.floor(date.getMilliseconds() / 100).toString(); },
        }),
        ff: FormatSpecifier.createInstance({
            code: 'ff',
            toDateFn: function (value) { return ({ millisecond: parseInt(value, 10) * 10 }); },
            toValueFn: function (date) { return addZeroPrefix(Math.floor(date.getMilliseconds() / 10), 2); },
        }),
        fff: FormatSpecifier.createInstance({
            code: 'fff',
            toDateName: 'millisecond',
            toValueFn: function (date) { return addZeroPrefix(date.getMilliseconds(), 3); },
        }),
    };
    return FormatSpecifiers;
}());

/**
 * TimeSpan class
 *
 * Represents a time interval.
 */
var TimeSpan = (function () {
    function TimeSpan(a, b, c, d, e) {
        if (b === undefined || c === undefined) {
            this._totalMilliseconds = a;
        }
        else if (d === undefined) {
            this._totalMilliseconds = a * msInTimeUnits.hour + b * msInTimeUnits.minute + c * msInTimeUnits.second;
        }
        else {
            this._totalMilliseconds =
                a * msInTimeUnits.day + b * msInTimeUnits.hour + c * msInTimeUnits.minute + d * msInTimeUnits.second + (e || 0);
        }
    }
    Object.defineProperty(TimeSpan.prototype, "days", {
        /**
         * Returns the days component of the time interval represented by the current TimeSpan structure.
         *
         * @returns {number}
         */
        get: function () {
            return this._days || (this._days = relativeFloor(this._totalMilliseconds / msInTimeUnits.day));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "hours", {
        /**
         * Returns the hours component of the time interval represented by the current TimeSpan structure.
         *
         * @returns {number}
         */
        get: function () {
            return this._hours || (this._hours = relativeFloor((this._totalMilliseconds / msInTimeUnits.hour) % 24));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "minutes", {
        /**
         * Returns the minutes component of the time interval represented by the current TimeSpan structure.
         *
         * @returns {number}
         */
        get: function () {
            return this._minutes || (this._minutes = relativeFloor((this._totalMilliseconds / msInTimeUnits.minute) % 60));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "seconds", {
        /**
         * Returns the seconds component of the time interval represented by the current TimeSpan structure.
         *
         * @returns {number}
         */
        get: function () {
            return this._seconds || (this._seconds = relativeFloor((this._totalMilliseconds / msInTimeUnits.second) % 60));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "milliseconds", {
        /**
         * Returns the milliseconds component of the time interval represented by the current TimeSpan structure.
         *
         * @returns {number}
         */
        get: function () {
            return this._milliseconds || (this._milliseconds = relativeFloor(this._totalMilliseconds % 1000));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalDays", {
        /**
         * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional days.
         *
         * @returns {number}
         */
        get: function () {
            return this._totalDays || (this._totalDays = this._totalMilliseconds / msInTimeUnits.day);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalHours", {
        /**
         * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional hours.
         *
         * @returns {number}
         */
        get: function () {
            return this._totalHours || (this._totalHours = this._totalMilliseconds / msInTimeUnits.hour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalMinutes", {
        /**
         * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional minutes.
         *
         * @returns {number}
         */
        get: function () {
            return this._totalMinutes || (this._totalMinutes = this._totalMilliseconds / msInTimeUnits.minute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalSeconds", {
        /**
         * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional seconds.
         *
         * @returns {number}
         */
        get: function () {
            return this._totalSeconds || (this._totalSeconds = this._totalMilliseconds / msInTimeUnits.second);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalMilliseconds", {
        /**
         * Returns the milliseconds value of the current TimeSpan structure expressed in whole and fractional milliseconds.
         *
         * @returns {number}
         */
        get: function () {
            return this._totalMilliseconds;
        },
        enumerable: true,
        configurable: true
    });
    return TimeSpan;
}());

var DateBuilderParams = (function () {
    function DateBuilderParams() {
        this.year = 0;
        this.month = 1;
        this.day = 1;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        this.isAfterNoon = false;
    }
    return DateBuilderParams;
}());
/**
 * DateTime class
 */
var DateTime = (function () {
    function DateTime() {
    }
    /**
     * Converts the value of the given Date object to its equivalent string representation using the specified format.
     *
     * @param date: Date
     * @param format: string
     * @returns {string}
     */
    DateTime.format = function (date, format) {
        var result = '';
        this.traverseFormat(format, function (traverseParams) {
            result += traverseParams.isSpecifier
                ? FormatSpecifiers.get(traverseParams.code).toValueFn(date)
                : traverseParams.code;
        });
        return result;
    };
    /**
     * Converts the specified string representation of a date and time to its Date equivalent using the specified format.
     *
     * @param datetime: string
     * @param format: string
     * @returns {Date}
     */
    DateTime.parseExact = function (datetime, format) {
        var dateBuilderParams = new DateBuilderParams();
        var formatSpecifier;
        var specifierTimeValue;
        DateTime.traverseFormat(format, function (traverseParams) {
            if (traverseParams.isSpecifier) {
                formatSpecifier = FormatSpecifiers.get(traverseParams.code);
                if (formatSpecifier.hasReverseAbility) {
                    specifierTimeValue = datetime.substring(traverseParams.startAt, traverseParams.endAt);
                    assign(dateBuilderParams, formatSpecifier.toDateFn(specifierTimeValue));
                }
            }
        });
        return DateTime.buildDate(dateBuilderParams);
    };
    /**
     * Returns a new TimeSpan object based on date and time subtraction between given Date objects.
     *
     * @param date1: Date
     * @param date2: Date
     * @returns {TimeSpan}
     */
    DateTime.subtract = function (date1, date2) {
        if (date2 === void 0) { date2 = new Date(); }
        return new TimeSpan(date1.getTime() - date2.getTime());
    };
    /**
     * Returns a new TimeSpan object based on date subtraction between given Date objects.
     *
     * @param date1: Date
     * @param date2: Date
     * @returns {TimeSpan}
     */
    DateTime.subtractDate = function (date1, date2) {
        if (date2 === void 0) { date2 = new Date(); }
        var date1Milliseconds = date1.getTime() -
            date1.getHours() * msInTimeUnits.hour -
            date1.getMinutes() * msInTimeUnits.minute -
            date1.getSeconds() * msInTimeUnits.second -
            date1.getMilliseconds();
        var date2Milliseconds = date2.getTime() -
            date2.getHours() * msInTimeUnits.hour -
            date2.getMinutes() * msInTimeUnits.minute -
            date2.getSeconds() * msInTimeUnits.second -
            date2.getMilliseconds();
        return new TimeSpan(date1Milliseconds - date2Milliseconds);
    };
    /**
     * Returns a new Date object based od DateBuilderParams object.
     *
     * @param params: DateBuilderParams
     * @returns {Date}
     */
    DateTime.buildDate = function (params) {
        var allParams = assign(new DateBuilderParams(), params);
        if (allParams.isAfterNoon) {
            allParams.hour += allParams.hour < 12 ? 12 : 0;
        }
        return new Date(allParams.year, allParams.month - 1, allParams.day, allParams.hour, allParams.minute, allParams.second, allParams.millisecond);
    };
    /**
     * Traverse given date format and trigger callback function for every format specifier from FormatSpecifiers or for
     * single, unfamiliar letter.
     *
     * @param format: string
     * @param callback: IFormatTraverseCallback
     */
    DateTime.traverseFormat = function (format, callback) {
        var currentSpecifier;
        var nextLetter;
        var buffer = '';
        for (var i = 0; i < format.length; i++) {
            currentSpecifier = buffer + format[i];
            nextLetter = format[i + 1];
            if (nextLetter && FormatSpecifiers.has(currentSpecifier + nextLetter)) {
                buffer += format[i];
                continue;
            }
            callback({
                code: currentSpecifier,
                isSpecifier: FormatSpecifiers.has(currentSpecifier),
                startAt: i - currentSpecifier.length + 1,
                endAt: i + currentSpecifier.length,
            });
            buffer = '';
        }
    };
    return DateTime;
}());

exports.DateTime = DateTime;
exports.TimeSpan = TimeSpan;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=date-time.umd.js.map
